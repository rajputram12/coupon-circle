import bcrypt from 'bcryptjs';
import { signupSchema } from '@/lib/validators/auth';
import { connectDb } from '@/lib/db/connect';
import { User } from '@/models/User';
import { jsonError, jsonOk } from '@/lib/api';

export async function POST(req: Request) {
  await connectDb();
  const parsed = signupSchema.safeParse(await req.json());
  if (!parsed.success) return jsonError(parsed.error.message, 422);
  const { name, email, password, role } = parsed.data;

  const exists = await User.findOne({ email });
  if (exists) return jsonError('Email already registered', 409);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, role, passwordHash });
  return jsonOk({ id: user._id, email: user.email, role: user.role }, 201);
}
