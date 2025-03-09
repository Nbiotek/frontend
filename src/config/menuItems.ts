import {
  Home,
  Calendar,
  User,
  CalendarClock,
  TestTubeDiagonal,
  NotepadText,
  CreditCard,
  Phone,
  ClipboardList,
  UserCircle,
  FileText,
  Settings,
  ShoppingCart,
  Bell,
  Users,
  BarChart,
  Building2,
  Activity,
  Microscope,
  FileCog,
  ShieldCheck,
  Upload,
  Book,
  BellDot
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
      submenu: [
        {
          title: 'Transaction History',
          url: ROUTES.PATIENT_BILLING_TRANSACTION_HISTORY.path
        },
        {
          title: 'Pending Payments',
          url: ROUTES.PATIENT_BILLING_PENDING_PAYMENTS.path
        },
        {
          title: 'Insurance',
          url: ROUTES.PATIENT_BILLING_INSURANCE.path
        }
      ]
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
      submenu: [
        {
          title: 'Settings',
          url: ROUTES.PATIENT_SETTINGS_SETTINGS.path
        },
        {
          title: 'Notifications',
          url: ROUTES.PATIENT_SETTING_NOTIFICATION.path
        }
      ]
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
      title: 'Result History',
      icon: Book,
      submenu: [
        {
          title: ROUTES.LAB_TECH_RESULT_HISTORY_RECENT.title,
          url: ROUTES.LAB_TECH_RESULT_HISTORY_RECENT.path
        },
        {
          title: ROUTES.LAB_TECH_RESULT_HISTORY_ARCHIVED.title,
          url: ROUTES.LAB_TECH_RESULT_HISTORY_ARCHIVED.path
        }
      ]
    },
    {
      title: 'Quality Control',
      icon: ShieldCheck,
      submenu: [
        {
          title: ROUTES.LAB_TECH_QUALITY_CONTROL_PENDING.title,
          url: ROUTES.LAB_TECH_QUALITY_CONTROL_PENDING.path
        },
        {
          title: ROUTES.LAB_TECH_QUALITY_CONTROL_HISTORY.title,
          url: ROUTES.LAB_TECH_QUALITY_CONTROL_HISTORY.path
        }
      ]
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
  ]
};
