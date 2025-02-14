import { env } from '@/env';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const token = request.headers?.get('Authorization')?.split(' ')[1];
  if (!token) return new Response('Unauthorized', { status: 401 });

  (await cookies()).set('__at', token, {
    secure: env.NODE_ENV === 'production',
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    priority: 'high',
    maxAge: 60 * 60 * 24 * 30
  });

  return new Response('OK');
}
