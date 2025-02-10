'use client';
import Image from 'next/image';
import {
  SidebarHeader,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  useSidebar
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import ProfileSide from './nav-profile';
import { PanelRightOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(state === 'collapsed');

  // Listen for screen resize events and update sidebar state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Run on mount
    handleResize();

    console.log(open);
    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Sidebar className="border-none shadow-xl">
      <SidebarHeader className="flex flex-row items-center justify-between bg-white">
        <Image src="/logo.svg" alt="Logo" width={115} height={69} />
        <PanelRightOpen onClick={toggleSidebar} size={24} className="text-neutral-400" />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <NavMain />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <ProfileSide />
      </SidebarFooter>
    </Sidebar>
  );
}
