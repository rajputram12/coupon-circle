import { Schema, model, models } from 'mongoose';

const couponFeedbackSchema = new Schema(
  {
    couponId: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    verdict: { type: String, enum: ['worked', 'not_worked'], required: true },
    comment: String,
  },
  { timestamps: true }
);

couponFeedbackSchema.index({ couponId: 1, userId: 1 }, { unique: true });

export const CouponFeedback = models.CouponFeedback || model('CouponFeedback', couponFeedbackSchema);
