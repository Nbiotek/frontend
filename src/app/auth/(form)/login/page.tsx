import ROUTES from '@/constants/routes';
import LoginView from './LoginView';
import { Metadata } from 'next';

const { title, description } = ROUTES.LOGIN;

export const metadata: Metadata = {
  title,
  description
};

export default function LoginPage() {
  return <LoginView />;
}
