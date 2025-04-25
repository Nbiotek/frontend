import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_NOTIFICATIONS;

export const metadata: Metadata = {
  title,
  description
};

export default function NotificationPage() {
  return <div>Notifications Page</div>;
}
