import NotificationView from './NotificationView';
import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH_NOTIFICATION;

export const metadata: Metadata = { title, description };

const NotificationPage = () => {
  return <NotificationView />;
};

export default NotificationPage;
