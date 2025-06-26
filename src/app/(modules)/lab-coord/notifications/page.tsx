import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import NotificationView from '@/components/common/notifications/NotificationView';

const { title, description } = ROUTES.LAB_COORD_NOTIFICATIONS;

export const metadata: Metadata = {
  title,
  description
};

export default function NotificationsPage() {
  return <NotificationView />;
}
