import { Metadata } from 'next';
import PersonalInfoView from './PersonalInfoView';

export const metadata: Metadata = {
  title: 'Personal Information | NBiotek',
  description:
    'View and manage your personal information, contact details, and medical profile. Update your patient information and preferences for NBiotek laboratory services.'
};

export default function Profile() {
  return <PersonalInfoView />;
}
