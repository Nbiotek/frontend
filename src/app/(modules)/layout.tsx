import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import MenuHeader from '@/components/dashboard/Header/menu-header';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-full w-full flex-col space-y-4 overflow-auto bg-blue-50/10">
        <MenuHeader />
        <section className="min-h-full w-full px-2">{children}</section>
      </main>
    </SidebarProvider>
  );
};

export default Dashboardlayout;
