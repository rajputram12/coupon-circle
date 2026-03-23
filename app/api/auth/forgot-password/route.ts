import crypto from 'crypto';
import { connectDb } from '@/lib/db/connect';
import { User } from '@/models/User';
import { Notification } from '@/models/Notification';
import { forgotPasswordSchema } from '@/lib/validators/auth';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: Request) {
  await connectDb();
  const parsed = forgotPasswordSchema.safeParse(await req.json());
  if (!parsed.success) return jsonError(parsed.error.message, 422);
  const user = await User.findOne({ email: parsed.data.email });
  if (user) {
    const token = crypto.randomBytes(16).toString('hex');
    await Notification.create({
      userId: user._id,
      type: 'trending_deals',
      title: 'Password reset requested',
      message: `Reset token: ${token} (demo only, implement secure email in production)`,
    });
  }
  return jsonOk({ message: 'If your account exists, reset instructions were sent.' });
}
