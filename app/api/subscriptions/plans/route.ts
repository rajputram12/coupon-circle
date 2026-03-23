import { connectDb } from '@/lib/db/connect';
import { SubscriptionPlan } from '@/models/SubscriptionPlan';
import { jsonOk } from '@/lib/api';

export async function GET() {
  await connectDb();
  const plans = await SubscriptionPlan.find({ isActive: true }).sort({ priceMonthly: 1 });
  return jsonOk({ plans });
}
