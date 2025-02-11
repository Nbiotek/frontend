import { type NextRequest, NextResponse } from 'next/server';
import logger from './utils/logger';
import { Mangle } from '@/constants/mangle';
import { cookies } from 'next/headers';
import Routes from './constants/routes';
import * as jwt from 'jsonwebtoken';

export default async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  //   const token = (await cookies()).get(Mangle.SESSION_TOKEN)?.value;
  //   if (!token) {
  //     logger.debug('Terminating Page Req', 'NO_SESSION');
  //     return NextResponse.redirect(new URL(Routes.LOGIN.path, request.url));
  //   }

  //   const payload = jwt.decode(token) as SessionPayload;
  //   if (!payload?.token) {
  //     logger.debug('Terminating Page Req', 'NO_ACCESS_TOKEN');

  //     return NextResponse.redirect(new URL(Routes.LOGIN.path, request.url));
  //   }

  //   if (Date.now() > (payload.exp ?? 0) * 1000) {
  //     logger.debug('Terminating Page Req', 'SESSION_EXPIRED');
  //     return NextResponse.redirect(new URL(Routes.LOGIN.path, request.url));
  //   }

  // TODO: Exclude the registeration route from dev or prod.

  return NextResponse.next();
}
