import { type Metadata } from 'next';
import SettingsView from './SettingsView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

const SettingPage = () => {
  return <SettingsView />;
};

export default SettingPage;
