import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_SUPPORT;

export const metadata: Metadata = {
  title,
  description
};

const page = () => {
  return <div>Support Page</div>;
};

export default page;
