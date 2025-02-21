import ROUTES from '@/constants/routes';
import { Metadata } from 'next';
import RegView from './RegView';

const { title, description } = ROUTES.REGISTER;

export const metadata: Metadata = {
  title,
  description
};

export default function Register() {
  return <RegView />;
}
