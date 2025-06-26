import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import NotificationView from '@/components/common/notifications/NotificationView';

const { title, description } = ROUTES.RECPTS_NOTIFICATIONS;

export const metadata: Metadata = {
  title,
  description
};

export default function NotificationPage() {
  return <NotificationView />;
}
