import { TestTube2, Calendar, MapPin } from 'lucide-react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { MdEmergency } from 'react-icons/md';

export interface QuickActionProps {
  icon: React.ReactNode;
  titleLink: string;
  subTitle: string;
  btnArrow?: React.ReactNode;
  href: string;
}

export const PatientQuickLinks: QuickActionProps[] = [
  {
    icon: <TestTube2 />,
    titleLink: 'Lab Tests',
    subTitle: 'Schedule your lab tests',
    href: '/patient/test/available'
  },
  {
    icon: <Calendar />,
    titleLink: 'Book an Appointments',
    subTitle: 'Book a test appointment',
    href: '/patient/appointment/booking'
  },
  {
    icon: <MapPin />,
    titleLink: 'Locate our laboratory',
    subTitle: 'Locate our Physical Lab',
    href: '/locations'
  },
  {
    icon: <HiOutlineSpeakerphone />,
    titleLink: 'Emergency',
    subTitle: 'Contact Us',
    href: '/locations'
  }
];
