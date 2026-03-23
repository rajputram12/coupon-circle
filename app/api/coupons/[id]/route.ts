import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Coupon } from '@/models/Coupon';
import { CouponView } from '@/models/CouponView';
import { Subscription } from '@/models/Subscription';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDb();
  const { id } = await params;
  const auth = getAuthFromRequest(req);
  const coupon = await Coupon.findById(id).populate('providerId', 'name');
  if (!coupon) return jsonError('Coupon not found', 404);

  const response = coupon.toObject();
  if (coupon.isPremium) {
    const active = auth
      ? await Subscription.findOne({ userId: auth.userId, status: 'active', endsAt: { $gt: new Date() } })
      : null;
    if (!active) response.code = 'LOCKED-••••';
  }

  await CouponView.create({ couponId: id, userId: auth?.userId, unlocked: response.code !== 'LOCKED-••••' });
  await Coupon.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });

  return jsonOk({ coupon: response });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'provider') return jsonError('Provider access required', 403);
  await connectDb();
  const { id } = await params;
  const coupon = await Coupon.findById(id);
  if (!coupon || coupon.providerId.toString() !== auth.userId) return jsonError('Not found', 404);
  if (coupon.status === 'verified') return jsonError('Verified coupons require admin review for changes', 409);

  const payload = await req.json();
  Object.assign(coupon, payload);
  coupon.status = 'pending';
  coupon.isVerified = false;
  await coupon.save();
  return jsonOk({ coupon });
}
