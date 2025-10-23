'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import {
  SidebarHeader,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import ProfileSide from './nav-profile';
import { usePathname } from 'next/navigation';
import { EnumRole } from '@/constants/mangle';
import { menuCommon, menuConfig, MenuItem } from '@/config/menuItems';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useFetchProfile();

  const pathname = usePathname();

  const roleMenu = useMemo(() => {
    return menuConfig[data?.role as EnumRole];
  }, [data?.role]);

  const isActive = (url: string) => pathname === url || pathname.startsWith(`${url}/`);

  const isSubmenuActive = (submenu: { url: string }[]) =>
    submenu.some((item) => isActive(item.url));

  const isCurrentPath = (menuItem: MenuItem, currentPath: string): boolean => {
    if (!menuItem.url) return false;

    if (!menuItem.isNestable) return menuItem.url === currentPath;

    return currentPath.startsWith(menuItem.url);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row items-center justify-between bg-white">
        <Image src="/logo.png" alt="Logo" width={60} height={20} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {roleMenu.map((item, index) =>
              !item.submenu ? (
                <Link key={item.url} href={item.url ?? ''}>
                  <SidebarMenuItem
                    key={index}
                    className={`${isCurrentPath(item, pathname) ? 'bg-blue-400 text-white' : ''} rounded-md hover:bg-blue-400 `}
                  >
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ) : (
                <Collapsible
                  key={item.title}
                  asChild
                  className="group/collapsible"
                  defaultOpen={isSubmenuActive(item.submenu)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={
                          isSubmenuActive(item.submenu)
                            ? 'bg-blue-400 text-white hover:text-white'
                            : 'hover:text-white'
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.submenu?.map((subItem) => (
                          <SidebarMenuSubItem
                            key={subItem.url}
                            className={`${pathname === subItem.url ? 'rounded-md bg-blue-50/20 text-blue-400' : ' '}`}
                          >
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarMenu>
            {menuCommon.map((item, index) => {
              return (
                <Link key={item.url} href={item.url ?? ''}>
                  <SidebarMenuItem
                    key={index}
                    className={`${isCurrentPath(item, pathname) ? 'bg-blue-400 text-white' : ''} rounded-md hover:bg-blue-400 `}
                  >
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <ProfileSide />
      </SidebarFooter>
    </Sidebar>
  );
}
