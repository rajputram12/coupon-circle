import { Schema, model, models } from 'mongoose';

const couponSchema = new Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    discountType: { type: String, enum: ['flat', 'percentage'], required: true },
    discountValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true, index: true },
    terms: { type: String, required: true },
    status: { type: String, enum: ['pending', 'verified', 'rejected', 'expired'], default: 'pending', index: true },
    isVerified: { type: Boolean, default: false, index: true },
    isFeatured: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    moderationNotes: String,
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    logoUrl: String,
    viewsCount: { type: Number, default: 0 },
    unlockCount: { type: Number, default: 0 },
    successCount: { type: Number, default: 0 },
    failureCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

couponSchema.index({ code: 1, brand: 1 }, { unique: true });

export const Coupon = models.Coupon || model('Coupon', couponSchema);
