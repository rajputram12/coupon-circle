import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
    subscriptionStatus: { type: String, enum: ['inactive', 'active', 'cancelled'], default: 'inactive' },
    activePlan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', default: null },
    walletBalance: { type: Number, default: 0 },
    isFrozen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models.User || model('User', userSchema);
