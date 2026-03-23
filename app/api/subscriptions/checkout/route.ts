import { NextRequest } from 'next/server';
import { connectDb } from '@/lib/db/connect';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { Subscription } from '@/models/Subscription';
import { User } from '@/models/User';
import { getAuthFromRequest } from '@/lib/auth/guards';
import { checkoutSchema } from '@/lib/validators/subscription';
import { paymentProvider } from '@/lib/payments/provider';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);
  if (!auth) return jsonError('Unauthorized', 401);
  await connectDb();
  const parsed = checkoutSchema.safeParse(await req.json());
  if (!parsed.success) return jsonError(parsed.error.message, 422);

  const plan = await SubscriptionPlan.findById(parsed.data.planId);
  if (!plan) return jsonError('Plan not found', 404);

  const session = await paymentProvider.createCheckoutSession({
    planId: plan._id.toString(),
    userId: auth.userId,
    amount: plan.priceMonthly,
    currency: 'USD',
  });

  const endsAt = new Date();
  endsAt.setMonth(endsAt.getMonth() + 1);

  const sub = await Subscription.create({
    userId: auth.userId,
    planId: plan._id,
    status: 'active',
    providerRef: session.referenceId,
    amountPaid: plan.priceMonthly,
    endsAt,
  });

  await User.findByIdAndUpdate(auth.userId, {
    subscriptionStatus: 'active',
    activePlan: plan._id,
  });

  return jsonOk({ checkoutUrl: session.checkoutUrl, subscription: sub }, 201);
}
