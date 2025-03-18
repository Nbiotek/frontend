import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';
import StaffView from './StaffView';

const { title, description } = ROUTES.LAB_COORD_STAFF_SCHEDULES;

export const metadata: Metadata = {
  title,
  description
};

const StaffPage = () => {
  return <StaffView />;
};

export default StaffPage;
