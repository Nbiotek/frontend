import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_NOTIFICATIONS;

export const metadata: Metadata = {
  title,
  description
};

const page = () => {
  return <div>Notifications Page</div>;
};

export default page;
