'use client';
import Cookies from 'js-cookie';
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
import { cn } from '@/lib/utils';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false';
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
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div
        className={cn(
          'm-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'sm:transition-[width] sm:duration-200 sm:ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
        )}
      >
        <MenuHeader fixed />
        <section className="h-screen w-full overflow-y-scroll px-2 py-24">{children}</section>
      </div>
    </SidebarProvider>
  );
};

export default observer(Dashboardlayout);
