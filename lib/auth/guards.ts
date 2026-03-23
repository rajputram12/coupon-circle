import { NextRequest } from 'next/server';
import { verifyToken } from './jwt';

export function getAuthFromRequest(req: NextRequest) {
  const token = req.cookies.get('couponclub_token')?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
