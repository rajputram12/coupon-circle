import { Schema, model, models } from 'mongoose';

const planSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    priceMonthly: { type: Number, required: true },
    couponUnlockLimit: { type: Number, required: true },
    includesPremium: { type: Boolean, default: false },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SubscriptionPlan = models.SubscriptionPlan || model('SubscriptionPlan', planSchema);
