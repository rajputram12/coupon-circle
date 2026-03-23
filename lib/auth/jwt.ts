import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-prod';

export type AuthTokenPayload = {
  userId: string;
  role: 'user' | 'provider' | 'admin';
  email: string;
};

export const signToken = (payload: AuthTokenPayload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
