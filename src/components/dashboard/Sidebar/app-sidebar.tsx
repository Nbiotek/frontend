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
import { EnumRole } from '@/constants/mangle';

export function AppSidebar() {
  const role = EnumRole.PATIENT;
  const menuItems = menuConfig[role];

  return (
    <Sidebar className="border-none shadow-xl">
      <SidebarHeader>
        <Image src="/logo.svg" alt="Logo" width={164} height={69} />
      </SidebarHeader>
      <SidebarContent className=" ">
        <NavMain items={menuItems} />
      </SidebarContent>
    </Sidebar>
  );
}
