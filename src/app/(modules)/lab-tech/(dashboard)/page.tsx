import DashboardView from './DashboardView';
import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH;
export const metadata: Metadata = {
  title,
  description
};

export default function LabTechPage() {
  return <DashboardView />;
}
