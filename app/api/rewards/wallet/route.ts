import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Wallet } from '@/models/Wallet';
import { RewardTransaction } from '@/models/RewardTransaction';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'provider') return jsonError('Provider access required', 403);
  await connectDb();
  const wallet = await Wallet.findOne({ userId: auth.userId });
  const transactions = await RewardTransaction.find({ providerId: auth.userId }).sort({ createdAt: -1 });
  return jsonOk({ wallet, transactions });
}
