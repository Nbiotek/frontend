import { Metadata } from 'next';
import DashboardView from './DashboardView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_COORD;

export const metadata: Metadata = {
  title,
  description
};

export default function DashboardPage() {
  return <DashboardView />;
}
