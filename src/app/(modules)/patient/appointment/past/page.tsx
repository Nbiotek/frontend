import { Metadata } from 'next';
import PastAppointmentView from './PastAppointmentView';

export const metadata: Metadata = {
  title: 'Past Appointments | NBiotek',
  description:
    'View your appointment history and past medical consultations. Search, filter, and sort through your completed appointments with NBiotek laboratory services.'
};

const PastAppointmentPage = () => {
  return <PastAppointmentView />;
};

export default PastAppointmentPage;
