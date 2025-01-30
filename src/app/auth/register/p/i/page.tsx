import InsuranceForm from './Insurance';
import type { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.PATIENT_REG_INSURANCE;

export const metadata: Metadata = { title, description };

const PatientRegPage = () => {
  return <InsuranceForm />;
};

export default PatientRegPage;
