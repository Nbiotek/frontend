import { type Metadata } from 'next';
import DashboardView from './DashboardView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS;

export const metadata: Metadata = {
  title,
  description
};

const page = () => {
  return <DashboardView />;
};

export default page;
