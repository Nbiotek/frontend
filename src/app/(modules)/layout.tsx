import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import MenuHeader from '@/components/dashboard/Header/menu-header';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-blue-50/10">
        <AppSidebar />
        <main className="flex w-full flex-col space-y-4 bg-blue-50/10">
          <MenuHeader />
          <section className="h-screen w-full overflow-y-scroll px-2">{children}</section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboardlayout;
