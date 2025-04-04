'use client';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    AuthStore: { user }
  } = useStore();

  useEffect(() => {
    if (Boolean(user.role)) {
      router.replace(ROUTES.getRedirectPathByRole(user.role as EnumRole));
    }
  });

  return <> {children} </>;
}
