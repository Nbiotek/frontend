import {
  Home,
  Calendar,
  User,
  CalendarClock,
  TestTubeDiagonal,
  NotepadText,
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
          title: 'Available Test',
          url: ROUTES.PATIENT_PAST_APPOINTMENTS.path
        },
        {
          title: 'Pending Test',
          url: ROUTES.PATIENT_PAST_APPOINTMENTS.path
        }
      ]
    },
    {
      title: 'Test Results',
      url: ROUTES.PATIENT_PAST_APPOINTMENTS.path,
      icon: NotepadText
    }
  ]
};
