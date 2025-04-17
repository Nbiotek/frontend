import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

const page = () => {
  return <div>Settings Page</div>;
};

export default page;
