import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { User } from '@/models/User';
import { Coupon } from '@/models/Coupon';
import { Subscription } from '@/models/Subscription';
import { jsonError, jsonOk } from '@/lib/api';

export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth || auth.role !== 'admin') return jsonError('Admin access required', 403);
  await connectDb();

  const [totalUsers, totalSubscribers, totalProviders, totalCoupons, pendingVerifications] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ subscriptionStatus: 'active' }),
    User.countDocuments({ role: 'provider' }),
    Coupon.countDocuments({}),
    Coupon.countDocuments({ status: 'pending' }),
  ]);

  const startMonth = new Date();
  startMonth.setDate(1);
  const monthlyRevenueAgg = await Subscription.aggregate([
    { $match: { createdAt: { $gte: startMonth }, status: 'active' } },
    { $group: { _id: null, revenue: { $sum: '$amountPaid' } } },
  ]);

  return jsonOk({
    totalUsers,
    totalSubscribers,
    totalProviders,
    totalCoupons,
    pendingVerifications,
    monthlyRevenue: monthlyRevenueAgg[0]?.revenue ?? 0,
  });
}
