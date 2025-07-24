'use client';
import { Bell, Settings, PanelRightClose } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';

import { CartPopup } from '@/components/cart/CartPopup';
import { EnumRole } from '@/constants/mangle';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';
import ROUTES from '@/constants/routes';

const MenuHeader = () => {
  const { state, toggleSidebar } = useSidebar();
  const { data } = useFetchProfile();
  const {
    NotificationStore: { unReadNotifyCount }
  } = useStore();

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
        <div className="flex items-center justify-between space-x-4">
          <Link href={ROUTES.NOTIFICATION.path}>
            <div className="relative">
              <div
                data-show={Boolean(unReadNotifyCount)}
                className="absolute -right-2 -top-1 hidden data-[show=true]:block"
              >
                <Badge
                  className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 tabular-nums"
                  variant="destructive"
                >
                  {unReadNotifyCount > 99 ? '99+' : unReadNotifyCount}
                </Badge>
              </div>

              <Bell color="#4044A7" />
            </div>
          </Link>

          <Link href={ROUTES.SETTINGS.path}>
            <Settings color="#4044A7" />
          </Link>
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

export default observer(MenuHeader);
