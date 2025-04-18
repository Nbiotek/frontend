import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.RECPTS_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

export default function SettingsPage() {
  return <div>Settings Page</div>;
}
