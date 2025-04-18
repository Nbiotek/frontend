import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import SupportView from './SupportView';

const { title, description } = ROUTES.LAB_COORD_SUPPORT;

export const metadata: Metadata = {
  title,
  description
};

export default function SupportPage() {
  return <SupportView />;
}
