import { NextRequest } from 'next/server';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { connectDb } from '@/lib/db/connect';
import { User } from '@/models/User';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  const user = await User.findById(auth.userId).select('-passwordHash').populate('activePlan');
  return jsonOk({ user });
}
