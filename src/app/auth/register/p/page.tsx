import PersonalForm from './Personal';
import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.PATIENT_REG_INFO;

export const metadata: Metadata = { title, description };

const PatientRegPage = () => {
  return <PersonalForm />;
};

export default PatientRegPage;
