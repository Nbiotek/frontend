'use client';
import { useEffect, useState } from 'react';
import { Paragraph } from '@/atoms/typographys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NOTIFICATIONS } from '@/constants/api';
import { readNotification } from '@/requests/notifications';
import { NotificationDate } from '@/utils/date';
import { TNotificationDatum } from '@/types/notification';
import { useFetchNotifications } from '@/hooks/notifications/useFetchNotifications';
import { ClipLoader, DotLoader } from 'react-spinners';
import NotifyBtn from './NotifyBtn';
import NotificationActions from './NotificationActions';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import ActionCard from './ActionCard';
import toast from 'react-hot-toast';
import EmptyState from '@/components/EmptyState';

interface INotificationsProps {
  viewType: 'desktop' | 'mobile';
}

const NotificationCard = ({ viewType }: INotificationsProps) => {
  const [currItem, setCurrItem] = useState('');
  const [notifications, setNotifications] = useState<Array<TNotificationDatum> | []>([]);
  const {
    NotificationStore: { setReadMoreItem, readMoreItem, setNotifyUnreadCount }
  } = useStore();
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchNotifications();

  const { mutate: readMutate } = useMutation({
    mutationFn: readNotification,
    onError: () => {
      toast.error('');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS.GET_ALL] });
    },
    onSettled: () => {
      setCurrItem('');
    }
  });

  useEffect(() => {
    if (!isLoading) {
      if (data !== undefined) {
        let count = 0;

        data.notification.map((el: TNotificationDatum) =>
          el.is_viewed ? (count += 0) : (count += 1)
        );
        setNotifyUnreadCount(count);

        const orderedActivities = data.notification.sort(
          (a: TNotificationDatum, b: TNotificationDatum) => {
            const dateA = new Date(a.create_time);
            const dateB = new Date(b.create_time);
            return dateB.getTime() - dateA.getTime();
          }
        );
        setNotifications(orderedActivities);
      }
    }
  }, [isLoading, data]);

  return (
    <aside data-view={viewType} className="h-full w-full bg-white data-[view=desktop]:rounded-lg">
      <div className="relative h-full w-full rounded-lg data-[view=desktop]:overflow-clip">
        <div className="flex items-center justify-between rounded-t border-b border-borderLine bg-white p-2">
          <Paragraph className="!font-medium" text="Notifications" />
        </div>
        <div
          data-view={viewType}
          className="top-0 h-svh rounded-lg data-[view=desktop]:max-h-[400px] data-[view=desktop]:overflow-x-clip data-[view=desktop]:overflow-y-scroll"
        >
          {isLoading ? (
            <div className="flex h-[400px] w-full flex-col items-center justify-center space-y-2">
              <DotLoader size={15} color="#004AAD" />
              <Paragraph
                className="text-typeGray"
                text="Hang on a moment, we are retrieving your data."
              />
            </div>
          ) : notifications.length === 0 ? (
            <div className="h-[400px] w-full rounded-lg bg-white">
              <EmptyState
                title="Enjoy the silence."
                description="New notitications will appear here."
              />
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-neutral-50">
              {notifications.map((datum) => {
                return (
                  <div
                    data-isviewed={datum.is_viewed}
                    key={`notifications_${datum.uuid}`}
                    className="flex flex-col space-y-1 bg-blue-50/20 p-2 last:pb-40 data-[isviewed=true]:bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-grotesk text-sm font-medium text-black">{datum.name}</p>

                      <div className="relative">
                        <div className="flex items-center justify-start space-x-1">
                          {currItem === datum.uuid ? (
                            <ClipLoader
                              color="#E83289"
                              size={10}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            <>
                              <p className="text-xs text-typeGray">
                                {NotificationDate(datum.create_time)}
                              </p>
                            </>
                          )}

                          <ActionCard uuid={datum.uuid} {...{ setCurrItem, readMutate }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <div className="w-full">
                        <p
                          className={`${viewType === 'desktop' ? (readMoreItem === datum.uuid ? '' : 'line-clamp-1') : ''} text-xs text-neutral-800`}
                        >
                          {datum.description}
                        </p>
                        {datum.description.length > 100 ? (
                          viewType === 'desktop' && readMoreItem !== datum.uuid ? (
                            <NotifyBtn
                              variant="underline"
                              onClick={() => {
                                setReadMoreItem(datum.uuid);
                              }}
                            >
                              Read more
                            </NotifyBtn>
                          ) : null
                        ) : null}
                      </div>

                      <div className="flex items-center justify-start space-x-2">
                        {NotificationActions(datum.notification_type, datum)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default observer(NotificationCard);
