import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { CouponFeedback } from '@/models/CouponFeedback';
import { Coupon } from '@/models/Coupon';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { feedbackSchema } from '@/lib/validators/coupon';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  const body = await req.json();
  const parsed = feedbackSchema.safeParse(body);
  if (!parsed.success) return jsonError(parsed.error.message, 422);
  const feedback = await CouponFeedback.findOneAndUpdate(
    { couponId: body.couponId, userId: auth.userId },
    { ...parsed.data, couponId: body.couponId, userId: auth.userId },
    { upsert: true, new: true }
  );

  await Coupon.findByIdAndUpdate(body.couponId, {
    $inc: parsed.data.verdict === 'worked' ? { successCount: 1 } : { failureCount: 1 },
  });

  return jsonOk({ feedback }, 201);
}
