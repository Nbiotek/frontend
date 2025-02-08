import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import MenuHeader from '@/components/dashboard/Header/menu-header';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-blue-50/10">
        <AppSidebar />
        <main className="flex w-full flex-col bg-blue-50/10">
          <MenuHeader />
          <section className="h-screen w-full overflow-y-scroll p-2">{children}</section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboardlayout;
