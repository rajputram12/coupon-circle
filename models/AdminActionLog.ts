import { Schema, model, models } from 'mongoose';

const adminActionLogSchema = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: String, required: true },
    metadata: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export const AdminActionLog = models.AdminActionLog || model('AdminActionLog', adminActionLogSchema);
