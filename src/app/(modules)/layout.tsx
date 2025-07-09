'use client';

import { useCallback, useEffect, useState } from 'react';
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
import NotificationPrompt from '@/components/Prompts/NotificationPrompt';

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

  // const checkAuthorization = useCallback(
  //   (profile: Partial<TProfileInfo>) => {
  //     for (let route of allProtectedRoutes) {
  //       if (pathname.startsWith(route)) {
  //         const requiredRoles = allProtectedRoutesObj.get(route);
  //         if (requiredRoles && profile.email_verified) {
  //           if (requiredRoles.includes(profile.role as EnumRole)) {
  //             setAuthStatus('authorized');
  //             return;
  //           } else {
  //             router.replace(ROUTES.DENIED.path);
  //             return;
  //           }
  //         }
  //       }
  //     }
  //   },
  //   [pathname, allProtectedRoutes, allProtectedRoutesObj, router]
  // );

  useEffect(() => {
    if (!accessToken || status === 'error') {
      router.replace(ROUTES.LOGIN.path);
      return;
    }

    if (!isLoading && data !== undefined) {
      if (data.email_verified) {
        for (let route of allProtectedRoutes) {
          if (pathname.startsWith(route)) {
            const requiredRoles = allProtectedRoutesObj.get(route);
            if (requiredRoles) {
              if (requiredRoles.includes(data.role as EnumRole)) {
                setAuthStatus('authorized');
                return;
              } else {
                router.replace(ROUTES.DENIED.path);
                return;
              }
            }
          }
        }
        setAuthStatus('authorized');
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
      <NotificationPrompt />
    </>
  );
};

export default observer(Dashboardlayout);
