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

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState<Partial<TProfileInfo>>({});
  const { data, status } = useFetchProfile();

  const allProtectedRoutesObj = ROUTES.getAllProtectedRoutes();
  const allProtectedRoutes = allProtectedRoutesObj.keys();

  const checkAuthorization = useCallback(() => {
    for (let route of allProtectedRoutes) {
      if (pathname.startsWith(route)) {
        const role = allProtectedRoutesObj.get(route);

        console.log(role, pathname);

        if (role && data) {
          if (role.includes(userData.role as EnumRole)) {
            return router.replace(pathname);
          } else {
            return router.replace(ROUTES.UNAUTHORIZED.path);
          }
        }
      }
    }
  }, [pathname, userData]);

  useEffect(() => {
    if (data !== undefined) {
      setUserData(data);
    }
  }, [data]);

  useEffect(() => {
    checkAuthorization();
  }, [checkAuthorization]);

  if (status === 'pending') {
    return <PageLoading />;
  } else if (status === 'error') {
    return redirect(ROUTES.LOGIN.path);
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

export default Dashboardlayout;
