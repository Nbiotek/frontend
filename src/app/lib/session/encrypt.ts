import 'server-only';
import { sign } from 'jsonwebtoken';
import { env } from '@/env';
import { cookies } from 'next/headers';
import { decodeJWT } from '@/store/AuthStore';
import { Mangle } from '@/constants/mangle';

const secretKey = env.SESSION_SECRET;

export async function encrypt(payload: SessionPayload) {
  return sign(payload, secretKey);
}

export async function createSession(payload: SessionPayload) {
  const decodedToken = decodeJWT(payload.token);
  const _payload = { ...payload, exp: decodedToken?.exp ?? 0 };

  const session = await encrypt(_payload);

  (await cookies()).set(Mangle.SESSION_TOKEN, session, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    expires: new Date((decodedToken?.exp ?? 0) * 1000),
    sameSite: 'lax',
    path: '/',
    priority: 'high'
  });
}
