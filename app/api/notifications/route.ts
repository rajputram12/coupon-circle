import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Notification } from '@/models/Notification';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  const notifications = await Notification.find({ userId: auth.userId }).sort({ createdAt: -1 }).limit(50);
  return jsonOk({ notifications });
}

export async function PATCH(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  await Notification.updateMany({ userId: auth.userId, readAt: null }, { readAt: new Date() });
  return jsonOk({ updated: true });
}
