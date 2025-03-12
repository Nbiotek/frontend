import {
  Home,
  User,
  CalendarClock,
  TestTubeDiagonal,
  NotepadText,
  CreditCard,
  Bell,
  Phone,
  LayoutDashboard,
  Hospital,
  ClipboardList,
  UserCircle,
  FileText,
  Settings,
  ShieldCheck,
  Book,
  BellDot,
  UsersIcon,
  PhoneCallIcon,
  FilesIcon,
  FileTextIcon
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';

export type UserRole = 'patient';

export interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  submenu?: Array<{
    title: string;
    url: string;
  }>;
}

export const menuConfig: Record<string, MenuItem[]> = {
  [EnumRole.PATIENT]: [
    {
      title: ROUTES.PATIENT.title,
      url: ROUTES.PATIENT.path,
      icon: Home
    },
    {
      title: ROUTES.PATIENT_INFO.title,
      url: ROUTES.PATIENT_INFO.path,
      icon: User
    },
    {
      title: 'Appointments',
      icon: CalendarClock,
      submenu: [
        {
          title: ROUTES.PATIENT_BOOK_APPOINTMENTS.title,
          url: ROUTES.PATIENT_BOOK_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_UPCOMING_APPOINTMENTS.title,
          url: ROUTES.PATIENT_UPCOMING_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_PENDING_APPOINTMENTS.title,
          url: ROUTES.PATIENT_PENDING_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_PAST_APPOINTMENTS.title,
          url: ROUTES.PATIENT_PAST_APPOINTMENTS.path
        }
      ]
    },
    {
      title: 'Test request',
      icon: TestTubeDiagonal,
      url: ROUTES.PATIENT_AVAILABLE_TEST.path
    },
    {
      title: 'Test Results',
      url: ROUTES.PATIENT_TEST_RESULT.path,
      icon: NotepadText
    },
    {
      title: 'Biling & Payment',
      icon: CreditCard,
      url: ROUTES.PATIENT_BILLING_TRANSACTION_HISTORY.path
    },
    {
      title: 'Support & Help',
      icon: Phone,
      submenu: [
        {
          title: 'Contact Us',
          url: ROUTES.PATIENT_SUPPORT_CONTACT.path
        },
        {
          title: 'FAQ',
          url: ROUTES.PATIENT_SUPPORT_FAQ.path
        }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      url: ROUTES.PATIENT_SETTINGS.path
    }
  ],
  [EnumRole.DOCTOR]: [
    {
      title: ROUTES.DOCTOR.title,
      url: ROUTES.DOCTOR.path,
      icon: LayoutDashboard
    },
    {
      title: ROUTES.DOCTOR_TEST_REVIEW.title,
      url: ROUTES.DOCTOR_TEST_REVIEW.path,
      icon: NotepadText
    },
    {
      title: ROUTES.DOCTOR_REFERRALS.title,
      url: ROUTES.DOCTOR_REFERRALS.path,
      icon: Hospital
    },
    {
      title: ROUTES.DOCTOR_NOTIFICATION.title,
      url: ROUTES.DOCTOR_NOTIFICATION.path,
      icon: Bell
    },
    {
      title: ROUTES.DOCTOR_SETTINGS.title,
      url: ROUTES.DOCTOR_SETTINGS.path,
      icon: Settings
    }
  ],

  [EnumRole.LAB_TECHNICIAN]: [
    {
      title: ROUTES.LAB_TECH.title,
      url: ROUTES.LAB_TECH.path,
      icon: Home
    },
    {
      title: ROUTES.LAB_TECH_TEST.title,
      url: ROUTES.LAB_TECH_TEST.path,
      icon: TestTubeDiagonal
    },
    {
      title: ROUTES.LAB_TECH_RESULT_HISTORY.title,
      icon: Book,
      url: ROUTES.LAB_TECH_RESULT_HISTORY.path
    },
    {
      title: ROUTES.LAB_TECH_QUALITY_CONTROL.title,
      icon: ShieldCheck,
      url: ROUTES.LAB_TECH_QUALITY_CONTROL.path
    },
    {
      title: ROUTES.LAB_TECH_NOTIFICATION.title,
      url: ROUTES.LAB_TECH_NOTIFICATION.path,
      icon: BellDot
    },
    {
      title: 'Support & help',
      icon: Phone,
      submenu: [
        {
          title: ROUTES.LAB_TECH_SUPPORT_CONTACT.title,
          url: ROUTES.LAB_TECH_SUPPORT_CONTACT.path
        },
        {
          title: ROUTES.LAB_TECH_SUPPORT_FAQ.title,
          url: ROUTES.LAB_TECH_SUPPORT_FAQ.path
        }
      ]
    },
    {
      title: ROUTES.LAB_TECH_SETTINGS.title,
      url: ROUTES.LAB_TECH_SETTINGS.path,
      icon: Settings
    }
  ],

  [EnumRole.LAB_CORDINATOR]: [
    {
      title: ROUTES.LAB_COORD.title,
      url: ROUTES.LAB_COORD.path,
      icon: Home
    },
    {
      title: ROUTES.LAB_COORD_TEST_SCHEDULING.title,
      url: ROUTES.LAB_COORD_TEST_SCHEDULING.path,
      icon: TestTubeDiagonal
    },
    {
      title: ROUTES.LAB_COORD_INVENTORY_MANAGEMENT.title,
      url: ROUTES.LAB_COORD_INVENTORY_MANAGEMENT.path,
      icon: FileTextIcon
    },
    {
      title: ROUTES.LAB_COORD_STAFF_SCHEDULES.title,
      url: ROUTES.LAB_COORD_STAFF_SCHEDULES.path,
      icon: UsersIcon
    },
    {
      title: ROUTES.LAB_COORD_QUALITY_CONTROL.title,
      url: ROUTES.LAB_COORD_QUALITY_CONTROL.path,
      icon: ShieldCheck
    },
    {
      title: ROUTES.LAB_COORD_NOTIFICATIONS.title,
      url: ROUTES.LAB_COORD_NOTIFICATIONS.path,
      icon: BellDot
    },
    {
      title: ROUTES.LAB_COORD_SUPPORT.title,
      url: ROUTES.LAB_COORD_SUPPORT.path,
      icon: PhoneCallIcon
    },
    {
      title: ROUTES.LAB_COORD_SETTINGS.title,
      url: ROUTES.LAB_COORD_SETTINGS.path,
      icon: Settings
    }
  ]
};
