import { NextRequest } from 'next/server';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { reportSchema } from '@/lib/validators/coupon';
import { connectDb } from '@/lib/db/connect';
import { AdminActionLog } from '@/models/AdminActionLog';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  const body = await req.json();
  const parsed = reportSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message, 422);

  await connectDb();
  await AdminActionLog.create({
    adminId: auth.userId,
    action: 'coupon_reported',
    targetType: 'coupon',
    targetId: body.couponId,
    metadata: { reason: parsed.data.reason, reporterRole: auth.role },
  });
  return jsonOk({ reported: true }, 201);
}
