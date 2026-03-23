import { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['coupon_approved', 'coupon_rejected', 'subscription_expiring', 'trending_deals', 'reward_credited'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    readAt: Date,
  },
  { timestamps: true }
);

export const Notification = models.Notification || model('Notification', notificationSchema);
