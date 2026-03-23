import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Coupon } from '@/models/Coupon';
import { couponInputSchema } from '@/lib/validators/coupon';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  await connectDb();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const expiringSoon = searchParams.get('expiringSoon') === 'true';
  const highestDiscount = searchParams.get('highestDiscount') === 'true';

  const query: Record<string, unknown> = { status: 'verified', isVerified: true };
  if (q) query.$or = [{ title: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }];
  if (category) query.category = category;
  if (brand) query.brand = brand;
  if (expiringSoon) query.expiryDate = { $lte: new Date(Date.now() + 7 * 86400000), $gte: new Date() };

  const sort = highestDiscount ? { discountValue: -1 } : { createdAt: -1 };
  const coupons = await Coupon.find(query).sort(sort).limit(100);
  return jsonOk({ coupons });
}

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'provider') return jsonError('Provider access required', 403);
  await connectDb();
  const parsed = couponInputSchema.safeParse(await req.json());
  if (!parsed.success) return jsonError(parsed.error.message, 422);

  try {
    const coupon = await Coupon.create({ ...parsed.data, providerId: auth.userId, status: 'pending', isVerified: false });
    return jsonOk({ coupon }, 201);
  } catch {
    return jsonError('Duplicate coupon for brand/code', 409);
  }
}
