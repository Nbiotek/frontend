import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';
import TestsView from './TestsView';

const { title, description } = ROUTES.LAB_COORD_TEST_SCHEDULING;

export const metadata: Metadata = {
  title,
  description
};

const TestsPage = () => {
  return <TestsView />;
};

export default TestsPage;
