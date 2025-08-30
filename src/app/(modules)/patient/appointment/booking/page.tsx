import { Metadata } from 'next';
import BookAppointmentView from './BookingView';

export const metadata: Metadata = {
  title: 'Book Appointment | NBiotek',
  description:
    'Schedule your medical appointment online. Choose from available tests, select your preferred date and time, and book your appointment with NBiotek laboratory services.'
};

const BookAppointment = () => {
  return <BookAppointmentView />;
};

export default BookAppointment;
