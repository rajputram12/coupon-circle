import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Coupon } from '@/models/Coupon';
import { Notification } from '@/models/Notification';
import { AdminActionLog } from '@/models/AdminActionLog';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'admin') return jsonError('Admin access required', 403);
  await connectDb();
  const { couponId, decision, moderationNotes } = await req.json();
  const isApprove = decision === 'approve';
  const coupon = await Coupon.findByIdAndUpdate(
    couponId,
    { status: isApprove ? 'verified' : 'rejected', isVerified: isApprove, moderationNotes },
    { new: true }
  );
  if (!coupon) return jsonError('Coupon not found', 404);

  await Notification.create({
    userId: coupon.providerId,
    type: isApprove ? 'coupon_approved' : 'coupon_rejected',
    title: isApprove ? 'Coupon approved' : 'Coupon rejected',
    message: moderationNotes || 'Reviewed by admin',
  });

  await AdminActionLog.create({
    adminId: auth.userId,
    action: isApprove ? 'coupon_approved' : 'coupon_rejected',
    targetType: 'coupon',
    targetId: coupon._id.toString(),
    metadata: { moderationNotes },
  });

  return jsonOk({ coupon });
}
