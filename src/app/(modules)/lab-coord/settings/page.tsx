import { Metadata } from 'next';
import ROUTES from '@/constants/routes';
import SettingsView from './SettingsView';

const { title, description } = ROUTES.LAB_COORD_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

export default function SettingsPage() {
  return <SettingsView />;
}
