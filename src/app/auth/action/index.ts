'use server';
import { createSession } from '@/app/lib/session/encrypt';
import decrypt from '@/app/lib/session/decrypt';
import { cookies } from 'next/headers';
import { Mangle } from '@/constants/mangle';

export async function setSession(payload: SessionPayload) {
  await createSession(payload);
}

export async function getSession() {
  const token = (await cookies()).get(Mangle.SESSION_TOKEN);

  const decryptedToken = await decrypt(token?.value);
  return decryptedToken;
}

export async function deleteSession() {
  (await cookies()).delete(Mangle.SESSION_TOKEN);
}
