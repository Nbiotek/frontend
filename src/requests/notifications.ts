import { NOTIFICATIONS } from '@/constants/api';
import server from '.';

// get requests
export const getAllNotifications = async () =>
  server.get<INBTServerResp<Array<TGetNotificationItem>>>(NOTIFICATIONS.GET_ALL);

// post requests
export const postReadAll = () => {
  return server.post<INBTServerResp<null>>(NOTIFICATIONS.READ_ALL);
};

export const postMarkAsRead = (id: string) => {
  const url = NOTIFICATIONS.MARK_AS_READ.replace(':id', id);
  return server.post<INBTServerResp<null>>(url);
};

export const postNotificationToken = async (payload: { token: string }) =>
  server.post<INBTServerResp<null>>(NOTIFICATIONS.TOGGLE, payload);

// delete requests
export const delNotificationToken = async () =>
  server.delete<INBTServerResp<null>>(NOTIFICATIONS.TOGGLE);
