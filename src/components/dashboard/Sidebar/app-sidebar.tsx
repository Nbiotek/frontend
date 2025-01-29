import Image from 'next/image';
import { Calendar, Home, Inbox, Plus, Search, Settings, ChevronRight } from 'lucide-react';

import { menuConfig } from '@/config/menuItems';
import {
  SidebarHeader,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroupAction
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { NavMain } from './nav-main';

export function AppSidebar() {
  const user = 'patient';
  const menuItems = menuConfig[user];

  return (
    <>
      {/* <SidebarTrigger /> */}
      <Sidebar className="mt-[20px] border-none shadow-xl">
        <SidebarHeader className="mt-6">
          <Image src="/logo.svg" alt="Logo" width={164} height={69} />
        </SidebarHeader>
        <SidebarContent className=" ">
          <NavMain items={menuItems} />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
