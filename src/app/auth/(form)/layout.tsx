'use client';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    AuthStore: { isAuthenticated }
  } = useStore();

  useEffect(() => {
    if (isAuthenticated().token) {
      if (isAuthenticated().role) {
        router.push(ROUTES.getRedirectPathByRole(isAuthenticated().role as EnumRole));
      }
    }
  }, [isAuthenticated, router]);

  return <> {children} </>;
}
