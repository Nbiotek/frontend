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
  FileCog
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';

export type UserRole = 'patient';

export interface MenuItem {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
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
      isActive: true,
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
          title: ROUTES.PATIENT_UPCOMING_APPOINTMENTS.title,
          url: ROUTES.PATIENT_UPCOMING_APPOINTMENTS.path
        },
        {
          title: ROUTES.PATIENT_BOOK_APPOINTMENTS.title,
          url: ROUTES.PATIENT_BOOK_APPOINTMENTS.path
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
      submenu: [
        {
          title: 'Available',
          url: ROUTES.PATIENT_PAST_APPOINTMENTS.path
        },
        {
          title: 'Pending',
          url: ROUTES.PATIENT_PAST_APPOINTMENTS.path
        }
      ]
    },
    {
      title: 'Test Results',
      url: ROUTES.PATIENT_PAST_APPOINTMENTS.path,
      icon: NotepadText
    },
    {
      title: 'Biling & Payment',
      icon: CreditCard,
      submenu: [
        {
          title: 'Transaction History',
          url: ROUTES.BILLING_TRANSACTION_HISTORY.path
        },
        {
          title: 'Pending Payments',
          url: ROUTES.BILLING_PENDING_PAYMENTS.path
        },
        {
          title: 'Insurance',
          url: ROUTES.BILLING_INSURANCE.path
        }
      ]
    },
    {
      title: 'Support & Help',
      icon: Phone,
      submenu: [
        {
          title: 'Contact Us',
          url: ROUTES.SUPPORT_CONTACT.path
        },
        {
          title: 'FAQ',
          url: ROUTES.SUPPORT_FAQ.path
        }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      submenu: [
        {
          title: 'Settings',
          url: ROUTES.SETTINGS_SETTINGS.path
        },
        {
          title: 'Notifications',
          url: ROUTES.SETTING_NOTIFICATION.path
        }
      ]
    }
  ]
};
