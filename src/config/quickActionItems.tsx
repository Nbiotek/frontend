import { TestTube2, Calendar, MapPin, MapPinCheck, Settings2 } from 'lucide-react';
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

export const DoctorsQuickLinks: QuickActionProps[] = [
  {
    icon: <TestTube2 />,
    titleLink: 'Review Test Result',
    subTitle: 'View All Assigned Test',
    href: '/doctor/review-test'
  },
  {
    icon: <MapPinCheck />,
    titleLink: 'Refer patient',
    subTitle: 'Refer patient to our lab',
    href: '/doctor/appointments/create'
  },
  {
    icon: <HiOutlineSpeakerphone />,
    titleLink: 'Notification',
    subTitle: 'View Notifications',
    href: '#'
  }
];

export const MarketerQuickLinks: QuickActionProps[] = [
  {
    icon: <TestTube2 />,
    titleLink: 'Field Tasks',
    subTitle: 'View All Assigned Test',
    href: '/marketer/field-tasks'
  },
  {
    icon: <MapPinCheck />,
    titleLink: 'Refer patient',
    subTitle: 'Refer patient to our lab',
    href: '/'
  }
];
