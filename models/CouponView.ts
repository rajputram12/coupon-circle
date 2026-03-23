import { Schema, model, models } from 'mongoose';

const couponViewSchema = new Schema(
  {
    couponId: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    ipHash: String,
    unlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const CouponView = models.CouponView || model('CouponView', couponViewSchema);
