import DashboardView from './DashboardView';
import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH;
export const metadata: Metadata = {
  title,
  description
};

const LabTechPage = () => {
  return <DashboardView />;
};

export default LabTechPage;
