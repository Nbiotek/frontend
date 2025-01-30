import ContactForm from './Contact';
import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.PATIENT_REG_CONTACT;

export const metadata: Metadata = { title, description };

const PatientRegPage = () => {
  return <ContactForm />;
};

export default PatientRegPage;
