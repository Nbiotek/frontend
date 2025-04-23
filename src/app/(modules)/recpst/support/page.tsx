import { Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_SUPPORT;

export const metadata: Metadata = {
  title,
  description
};

export default function SupportPage() {
  return <div>Support Page</div>;
}
