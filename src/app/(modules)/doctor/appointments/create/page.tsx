import { Metadata } from 'next';
import CreateAppointmentView from './CreateAppointmentView';

export const metadata: Metadata = {
  title: 'Create Appointment | NBiotek',
  description:
    'Create new patient appointments efficiently. Schedule consultations, set appointment times, manage patient bookings, and organize your medical practice calendar.'
};

const CreateAppointmentPage = () => {
  return <CreateAppointmentView />;
};

export default CreateAppointmentPage;
