'use client';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    AuthStore: { user, isAuthenticated }
  } = useStore();

  const { token, role } = isAuthenticated();

  useEffect(() => {
    if (role && token && user.email_verified) {
      router.replace(ROUTES.getRedirectPathByRole(user.role as EnumRole));
    }
  }, []);

  return <> {children} </>;
}
