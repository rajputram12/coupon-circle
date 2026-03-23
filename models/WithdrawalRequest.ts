import { Schema, model, models } from 'mongoose';

const withdrawalRequestSchema = new Schema(
  {
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
    payoutMethod: { type: String, default: 'bank_transfer' },
    adminNote: String,
  },
  { timestamps: true }
);

export const WithdrawalRequest = models.WithdrawalRequest || model('WithdrawalRequest', withdrawalRequestSchema);
