import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_APOINTMENT;

export const metadata: Metadata = {
  title,
  description
};

const page = () => {
  return <div>Appointments</div>;
};

export default page;
