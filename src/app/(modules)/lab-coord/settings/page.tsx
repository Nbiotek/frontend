import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';
import SettingsView from './SettingsView';

const { title, description } = ROUTES.LAB_COORD_SETTINGS;

export const metadata: Metadata = {
  title,
  description
};

const SettingsPage = () => {
  return <SettingsView />;
};

export default SettingsPage;
