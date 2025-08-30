import { Metadata } from 'next';
import Cards from '@/atoms/Cards';
import { Text } from '@/lib/utils/Text';
import InputSearch from '@/atoms/fields/InputSearch';
import UpcomingAppointmentView from './UpcomingView';

export const metadata: Metadata = {
  title: 'Upcoming Appointments | NBiotek',
  description:
    'View your upcoming medical appointments and laboratory tests. Manage your scheduled visits, check appointment details, and prepare for your upcoming visits with NBiotek.'
};

const UpcomingAppointment = () => {
  return <UpcomingAppointmentView />;
};

export default UpcomingAppointment;
