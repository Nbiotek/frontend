import { Metadata } from 'next';
import SettingsView from '@/components/common/settings/SettingsView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

export default function SettingPage() {
  return <SettingsView />;
}
