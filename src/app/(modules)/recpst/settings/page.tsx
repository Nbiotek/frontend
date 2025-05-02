import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';
import SettingsView from '@/components/common/settings/SettingsView';

const { title, description } = ROUTES.RECPTS_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

export default function SettingsPage() {
  return <SettingsView />;
}
