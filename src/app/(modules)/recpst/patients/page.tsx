import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import PatientsView from './PatientsView';

const { title, description } = ROUTES.RECPTS_PATIENT;

export const metadata: Metadata = {
  title,
  description
};

export default function PatientPage() {
  return <PatientsView />;
}
