import { Schema, model, models } from 'mongoose';

const rewardTransactionSchema = new Schema(
  {
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    couponId: { type: Schema.Types.ObjectId, ref: 'Coupon' },
    type: { type: String, enum: ['unlock_reward', 'success_reward', 'withdrawal'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'approved' },
    notes: String,
  },
  { timestamps: true }
);

export const RewardTransaction = models.RewardTransaction || model('RewardTransaction', rewardTransactionSchema);
