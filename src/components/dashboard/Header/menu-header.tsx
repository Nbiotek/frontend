'use client';
import { Bell, Settings, ShoppingCart, PanelRightClose } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';

import { CartPopup } from '@/components/cart/CartPopup';
import { EnumRole } from '@/constants/mangle';

const MenuHeader = () => {
  const { state, toggleSidebar } = useSidebar();
  const { data } = useFetchProfile();

  return (
    <div className="sticky top-0 z-10 w-full border border-r bg-white p-2 shadow-lg">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`${state === 'collapsed' ? 'block' : 'block md:hidden'}`}
            onClick={toggleSidebar}
          >
            <PanelRightClose size={24} className="text-neutral-400" />
          </button>
          <div className="flex flex-col">
            <SubTitle className="text-blue-400" text={`Hello ${data?.first_name}`} />
            <Paragraph className="text-blue-400" text="Welcome to your dashboard" />
          </div>
        </div>
        <div className="hidden items-center justify-between space-x-4 md:flex">
          <Bell color="#4044A7" />
          <Settings color="#4044A7" />
          {data?.role === EnumRole.PATIENT && (
            <div className="flex items-center space-x-2">
              <CartPopup />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
