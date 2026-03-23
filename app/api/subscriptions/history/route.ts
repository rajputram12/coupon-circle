import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Subscription } from '@/models/Subscription';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  const items = await Subscription.find({ userId: auth.userId }).populate('planId').sort({ createdAt: -1 });
  return jsonOk({ items });
}
