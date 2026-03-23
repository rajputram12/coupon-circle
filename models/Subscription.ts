import { Schema, model, models } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    providerRef: { type: String },
    startedAt: { type: Date, default: Date.now },
    endsAt: { type: Date, required: true },
    cancelledAt: Date,
    amountPaid: Number,
  },
  { timestamps: true }
);

export const Subscription = models.Subscription || model('Subscription', subscriptionSchema);
