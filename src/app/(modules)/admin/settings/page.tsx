import { Metadata } from 'next';
import SettingsView from '@/components/common/settings/SettingsView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

export default function SettingPage() {
  return <SettingsView />;
}
