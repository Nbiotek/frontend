'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import MenuHeader from '@/components/dashboard/Header/menu-header';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import PageLoading from '@/atoms/Loaders/PageLoading';
import { usePathname, useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { EnumRole } from '@/constants/mangle';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'pending' | 'authorized' | 'unauthorized'>(
    'pending'
  );

  const { data, status, isLoading } = useFetchProfile();
  const {
    AuthStore: { accessToken }
  } = useStore();

  const allProtectedRoutesObj = ROUTES.getAllProtectedRoutes();
  const allProtectedRoutes = allProtectedRoutesObj.keys();

  useEffect(() => {
    if (!accessToken || status === 'error') {
      router.replace(ROUTES.LOGIN.path);
      return;
    }

    if (!isLoading && data !== undefined) {
      if (data.email_verified) {
        let hasAccess = false;

        for (let route of allProtectedRoutes) {
          const requiredRoles = allProtectedRoutesObj.get(route);

          if (
            pathname === ROUTES.DENIED.path ||
            pathname.startsWith(ROUTES.PAYMENTS.path) ||
            pathname.startsWith(ROUTES.PAYMENT_VERIFY.path) ||
            pathname.startsWith('/payments/verify')
          ) {
            setAuthStatus('authorized');
            return;
          }

          if (requiredRoles && (pathname === route || pathname.startsWith(route + '/'))) {
            if (
              requiredRoles.includes(EnumRole.ALL) ||
              requiredRoles.includes(data.role as EnumRole)
            ) {
              hasAccess = true;
              break;
            }
          }
        }

        if (hasAccess) {
          setAuthStatus('authorized');
        } else {
          router.replace(ROUTES.DENIED.path);
        }
      } else {
        router.replace(ROUTES.LOGIN.path);
      }
    }
  }, [accessToken, status, data, isLoading, pathname]);

  if (authStatus === 'pending') {
    return <PageLoading />;
  }

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-blue-50/10">
          <AppSidebar />
          <main className="flex w-full flex-col">
            <MenuHeader />
            <section className="h-screen w-full overflow-y-scroll p-2">{children}</section>
          </main>
        </div>
      </SidebarProvider>
    </>
  );
};

export default observer(Dashboardlayout);
