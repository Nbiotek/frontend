'use client';
import { Bell, Settings, ShoppingCart, PanelRightOpen } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Paragraph, SubTitle } from '@/atoms/typographys';

const MenuHeader = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <div className="sticky top-0 z-40 w-full border border-r bg-white p-2 shadow-lg">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`${state === 'collapsed' ? 'block' : 'block md:hidden'}`}
            onClick={toggleSidebar}
          >
            <PanelRightOpen size={24} className="text-neutral-400" />
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
