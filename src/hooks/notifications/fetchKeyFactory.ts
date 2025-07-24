import { NOTIFICATIONS } from '@/constants/api';

export const notifications = {
  getNotifications() {
    return {
      path: NOTIFICATIONS.GET_ALL,
      keys: () => [NOTIFICATIONS.GET_ALL] as const
    };
  }
};
