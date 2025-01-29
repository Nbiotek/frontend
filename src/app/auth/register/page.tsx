import ROUTES from '@/constants/routes';
import RegisterView from './RegisterView';
import { Metadata } from 'next';

const { title, description } = ROUTES.REGISTER;

export const metadata: Metadata = {
  title,
  description
};

export default function Register() {
  return <RegisterView />;
}
