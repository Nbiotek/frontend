import { type NextRequest, NextResponse } from 'next/server';
import logger from './utils/logger';
import { EnumRole, Mangle } from '@/constants/mangle';
import { cookies } from 'next/headers';
import Routes, { roleAccessRules } from './constants/routes';
import * as jwt from 'jsonwebtoken';
import ROUTES from './constants/routes';
import { env } from './env';

const PUBLIC_PATHS = [
  Routes.HOME.path,
  Routes.ABOUT.path,
  Routes.FAQS.path,
  Routes.PRIVACY_POLICY.path,
  '/auth'
];

const AUTH_REDIRECT_PATHS = [Routes.LOGIN.path, Routes.REGISTER.path, Routes.OTP.path];

function isTokenExpired(exp?: number): boolean {
  if (!exp) return true;
  return Date.now() > exp * 1000;
}

function redirectToLogin(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(Routes.LOGIN.path, request.url));
}

function redirectToUnauthorized(request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(Routes.DENIED.path, request.url));
}

export default async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next();
  }

  try {
    const token = (await cookies()).get(Mangle.SESSION_TOKEN)?.value;

    if (token && AUTH_REDIRECT_PATHS.some((path) => pathname.startsWith(path))) {
      const payload = jwt.verify(token, env.SESSION_SECRET) as SessionPayload;
      if (payload?.token && !isTokenExpired(payload.exp)) {
        logger.debug('Redirecting authenticated user from auth page to dashboard', { pathname });
        return NextResponse.redirect(
          new URL(Routes.getRedirectPathByRole(payload.role as EnumRole), request.url)
        );
      }
    }

    if (!token) {
      logger.debug('No session token found', { pathname });

      if (!PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
        return redirectToLogin(request);
      }
      return NextResponse.next();
    }

    const payload = jwt.verify(token, env.SESSION_SECRET) as SessionPayload;
    console.log(payload, token);
    if (!payload?.token) {
      logger.debug('Invalid token payload', { pathname });
      return redirectToLogin(request);
    }

    if (isTokenExpired(payload.exp)) {
      logger.debug('Session token expired', { pathname });
      return redirectToLogin(request);
    }

    const allProtectedRoutesObj = ROUTES.getAllProtectedRoutes();
    const allProtectedRoutes = allProtectedRoutesObj.keys();

    for (let route of allProtectedRoutes) {
      if (pathname.startsWith(route)) {
        console.log(route, allProtectedRoutesObj.get(route));

        const role = allProtectedRoutesObj.get(route);

        if (role && payload.role) {
          if (!role.includes(payload.role as EnumRole)) {
            return redirectToUnauthorized(request);
          }
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    logger.error('Middleware error', { error, pathname });
    return redirectToLogin(request);
  }
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|not-found|.*\\..*).*)']
};
