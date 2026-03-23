import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { Subscription } from '@/models/Subscription';
import { User } from '@/models/User';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { paymentProvider } from '@/lib/payments/provider';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();

  const subscription = await Subscription.findOne({ userId: auth.userId, status: 'active' }).sort({ createdAt: -1 });
  if (!subscription) return jsonError('No active subscription found', 404);

  await paymentProvider.cancelSubscription(subscription.providerRef || subscription._id.toString());
  subscription.status = 'cancelled';
  subscription.cancelledAt = new Date();
  await subscription.save();
  await User.findByIdAndUpdate(auth.userId, { subscriptionStatus: 'cancelled' });

  return jsonOk({ subscription });
}
