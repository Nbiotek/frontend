'use client';
import { useEffect, useState } from 'react';
import { Text } from '@/lib/utils/Text';
import { Bell, Settings, Menu, ShoppingCart } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Paragraph, SubTitle } from '@/atoms/typographys';

const MenuHeader = () => {
  const { state, toggleSidebar, setOpen, open } = useSidebar();
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
    <div className="sticky top-0 z-40 w-full border border-r bg-white p-2 shadow-lg">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <button onClick={toggleSidebar}>
            <Menu size={25} />
          </button>
          <div className="flex flex-col">
            <SubTitle className="text-blue-400" text="Hello Charles" />
            <Paragraph className="text-blue-400" text="Welcome to your dashboard" />
          </div>
        </div>
        <div className="hidden items-center justify-between space-x-4 md:flex">
          <Bell color="#4044A7" />
          <Settings color="#4044A7" />
          <div className="flex items-center space-x-2">
            <ShoppingCart color="#000" />
            <Paragraph className="!font-bold" text="$57.00" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
