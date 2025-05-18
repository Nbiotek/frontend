'use client';
import { useCallback, useEffect, useState } from 'react';
import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import MenuHeader from '@/components/dashboard/Header/menu-header';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import PageLoading from '@/atoms/Loaders/PageLoading';
import { redirect, usePathname, useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { EnumRole } from '@/constants/mangle';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<Partial<TProfileInfo>>({});
  const { data, status, isLoading } = useFetchProfile();
  const {
    AuthStore: { accessToken }
  } = useStore();

  const allProtectedRoutesObj = ROUTES.getAllProtectedRoutes();
  const allProtectedRoutes = allProtectedRoutesObj.keys();

  const checkAuthorization = useCallback(() => {
    for (let route of allProtectedRoutes) {
      if (pathname.startsWith(route)) {
        const role = allProtectedRoutesObj.get(route);

        if (role && userData.email_verified) {
          if (role.includes(userData.role as EnumRole)) {
            return router.replace(pathname);
          } else {
            return router.replace(ROUTES.DENIED.path);
          }
        }
      }
    }
  }, [pathname, userData]);

  useEffect(() => {
    if (!isLoading && data !== undefined) {
      if (data.email_verified) {
        setUserData(data);
      } else {
        return router.replace(ROUTES.LOGIN.path);
      }
    }
  }, [data, isLoading]);

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  useEffect(() => {
    if (!accessToken) {
      return router.replace(ROUTES.LOGIN.path);
    }

    if (status === 'error') {
      return router.replace(ROUTES.LOGIN.path);
    }
  }, [accessToken, status]);

  if (!accessToken) {
    return <PageLoading />;
  }

  if (status === 'pending') {
    return <PageLoading />;
  }

  if (status === 'error') {
    return <PageLoading />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-blue-50/10">
        <AppSidebar />
        <main className="flex w-full flex-col">
          <MenuHeader />
          <section className="h-screen w-full overflow-y-scroll p-2">{children}</section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default observer(Dashboardlayout);
