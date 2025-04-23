import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import TestsView from './TestsView';

const { title, description } = ROUTES.LAB_COORD_TEST_SCHEDULING;

export const metadata: Metadata = {
  title,
  description
};

export default function TestsPage() {
  return <TestsView />;
}
