import { Metadata } from 'next';
import AppointmentSummary from '../AppointmentDetails';

export const metadata: Metadata = {
  title: 'Appointment Details | NBiotek',
  description:
    'View your appointment details, payment status, and manage your upcoming medical appointments. Reschedule appointments and access important information.'
};

const AppointmentDetailsPage = () => {
  return <AppointmentSummary />;
};

export default AppointmentDetailsPage;
