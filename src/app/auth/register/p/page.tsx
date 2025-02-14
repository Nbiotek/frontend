import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import PatientRegView from './PatientRegView';

const { title, description } = ROUTES.PATIENT_REG_INFO;

export const metadata: Metadata = { title, description };

const PatientRegPage = () => {
  return <PatientRegView />;
};

export default PatientRegPage;
