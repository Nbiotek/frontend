import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import SupportView from '@/components/common/support/SupportView';

const { title, description } = ROUTES.SUPPORT;

export const metadata: Metadata = {
  title,
  description
};

export default function NotificationPage() {
  return <SupportView />;
}
