'use client';
import { Bell, Settings } from 'lucide-react';
import { Paragraph, SubTitle } from '@/atoms/typographys';
import { useFetchProfile } from '@/hooks/user/useFetchProfile';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CartPopup } from '@/components/cart/CartPopup';
import { EnumRole } from '@/constants/mangle';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';
import ROUTES from '@/constants/routes';
import { useFetchNotifications } from '@/hooks/notifications/useFetchNotifications';
import { useEffect, useState } from 'react';
import { TNotificationDatum } from '@/types/notification';
import { Separator } from '@/components/ui/separator';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

const MenuHeader = ({ className, fixed, children, ...props }: HeaderProps) => {
  const { data } = useFetchProfile();
  const {
    NotificationStore: { unReadNotifyCount, setNotifyUnreadCount }
  } = useStore();
  const [offset, setOffset] = useState(0);
  const { data: notifications, isLoading } = useFetchNotifications();

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    document.addEventListener('scroll', onScroll, { passive: true });

    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (notifications !== undefined) {
        let count = 0;

        notifications.notification.map((el: TNotificationDatum) =>
          el.is_viewed ? (count += 0) : (count += 1)
        );
        setNotifyUnreadCount(count);
      }
    }
  }, [isLoading, notifications]);

  return (
    <div
      className={cn(
        'flex h-16 items-center gap-3 border-b bg-background bg-white p-2 sm:gap-4',
        fixed && 'header-fixed peer/header fixed z-40 w-[inherit]',
        offset > 10 && fixed ? 'shadow-sm' : 'shadow-none',
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-4 overflow-x-hidden">
        <div className="flex w-full items-center justify-start space-x-2">
          <SidebarTrigger variant="outline" className="scale-125 sm:scale-100" />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-col">
            <SubTitle className="text-blue-400" text={`Hello ${data?.first_name}`} />
            <Paragraph className="text-blue-400" text="Welcome to your dashboard" />
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-4">
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
