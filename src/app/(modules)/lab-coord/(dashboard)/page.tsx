import { type Metadata } from 'next';
import DashboardView from './DashboardView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_COORD;

export const metadata: Metadata = {
  title,
  description
};

const DashboardPage = () => {
  return <DashboardView />;
};

export default DashboardPage;
