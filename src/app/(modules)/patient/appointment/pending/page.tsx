import { Metadata } from 'next';
import PendingAppointmentView from './PendingAppointmentView';

export const metadata: Metadata = {
  title: 'Pending Appointments | NBiotek',
  description:
    'View and manage your upcoming appointments. Check appointment status, make payments, and reschedule your pending medical appointments with NBiotek laboratory services.'
};

const PendingAppointmentPage = () => {
  return <PendingAppointmentView />;
};

export default PendingAppointmentPage;
