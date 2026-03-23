import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Wallet } from '@/models/Wallet';
import { WithdrawalRequest } from '@/models/WithdrawalRequest';
import { withdrawalSchema } from '@/lib/validators/subscription';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  const requests = await WithdrawalRequest.find(
    auth.role === 'admin' ? {} : { providerId: auth.userId }
  ).sort({ createdAt: -1 });
  return jsonOk({ requests });
}

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'provider') return jsonError('Provider access required', 403);
  const parsed = withdrawalSchema.safeParse(await req.json());
  if (!parsed.success) return jsonError(parsed.error.message, 422);

  await connectDb();
  const wallet = await Wallet.findOne({ userId: auth.userId });
  if (!wallet || wallet.balance < parsed.data.amount) return jsonError('Insufficient balance', 400);
  const request = await WithdrawalRequest.create({ providerId: auth.userId, amount: parsed.data.amount });
  return jsonOk({ request }, 201);
}

export async function PATCH(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'admin') return jsonError('Admin access required', 403);
  await connectDb();
  const { requestId, status, adminNote } = await req.json();
  const request = await WithdrawalRequest.findByIdAndUpdate(requestId, { status, adminNote }, { new: true });
  return jsonOk({ request });
}
