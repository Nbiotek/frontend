import { AppSidebar } from '@/components/dashboard/Sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import MenuHeader from '@/components/dashboard/Header/menu-header';

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen  w-[100%] ">
        <AppSidebar />
        <main className="w-full bg-[#EEF5FF]">
          <MenuHeader />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboardlayout;
