import Image from 'next/image';
import { SidebarHeader, Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import ProfileSide from './nav-profile';

export function AppSidebar() {
  return (
    <Sidebar className="border-none shadow-xl">
      <SidebarHeader>
        <Image src="/logo.svg" alt="Logo" width={164} height={69} />
      </SidebarHeader>
      <SidebarContent className=" ">
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <ProfileSide />
      </SidebarFooter>
    </Sidebar>
  );
}
