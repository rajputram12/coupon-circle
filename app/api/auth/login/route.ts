import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/validators/auth';
import { connectDb } from '@/lib/db/connect';
import { User } from '@/models/User';
import { jsonError, jsonOk } from '@/lib/api';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: Request) {
  await connectDb();
  const parsed = loginSchema.safeParse(await req.json());
  if (!parsed.success) return jsonError(parsed.error.message, 422);
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return jsonError('Invalid credentials', 401);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return jsonError('Invalid credentials', 401);

  const token = signToken({ userId: user._id.toString(), role: user.role, email: user.email });
  (await cookies()).set('couponclub_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return jsonOk({ id: user._id, role: user.role, name: user.name });
}
