'use client';

import { useEffect, useState } from 'react';
import { Text } from '@/lib/utils/Text';
import { Bell, Settings, Menu } from 'lucide-react';
import { PiHandbag } from 'react-icons/pi';
import { useSidebar } from '@/components/ui/sidebar';

const MenuHeader = () => {
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

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('Sidebar state:', state);
  console.log('Is collapsed:', isCollapsed);

  return (
    <div className="w-full bg-white px-7 py-3 shadow-lg  ">
      <div className="flexBetween w-full max-w-[1400px]">
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <button onClick={toggleSidebar}>
              <Menu size={32} />
            </button>
          ) : (
            ' '
          )}
          <div className="flex flex-col">
            <Text variant="h3" className="text-blue-400 ">
              Hello Charles
            </Text>
            <Text variant="body" weight="normal" className="text-blue-400">
              Welcome to your dashboard
            </Text>
          </div>
        </div>
        <div className="hidden w-[261px] items-center justify-between md:flex">
          <Bell size={32} color="#4044A7" />
          <Settings size={32} color="#4044A7" />
          <div className="flex items-center gap-2">
            <PiHandbag size={32} color="#000" />
            <div>
              <Text variant="body" weight="thin">
                Shopping cart:
              </Text>
              <Text variant="body" weight="bold">
                $57.00
              </Text>
            </div>
          </div>
        </div>
        <Menu size={32} className="md:hidden" />
      </div>
    </div>
  );
};

export default MenuHeader;
