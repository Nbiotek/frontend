import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_APOINTMENT;

export const metadata: Metadata = {
  title,
  description
};

export default function PatientPage() {
  return <div>Patients Registartion.</div>;
}
