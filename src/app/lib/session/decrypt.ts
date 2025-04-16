import 'server-only';
import { verify } from 'jsonwebtoken';
import { env } from '@/env';
import logger from '@/utils/logger';

export default async function decrypt(session: string | undefined = '') {
  try {
    const secretKey = env.SESSION_SECRET;
    const payload = verify(session, secretKey) as SessionPayload;
    return payload;
  } catch (error) {
    logger.error('Error decrypting session', error);
  }
}
