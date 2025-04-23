import NotificationView from './NotificationView';
import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH_NOTIFICATION;

export const metadata: Metadata = { title, description };

export default function NotificationPage() {
  return <NotificationView />;
}
