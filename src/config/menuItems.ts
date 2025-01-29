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

import { MenuItem, UserRole } from '@/types/navigation';

export const menuConfig: Record<UserRole, MenuItem[]> = {
  patient: [
    {
      title: 'Dashboard',
      url: '/patient/dashboard',
      isActive: true,
      icon: Home
    },
    {
      title: 'Personal Info',
      url: '/patient/appointments',
      icon: User
    },
    {
      title: 'Appointment',
      url: '/patient/appointments',
      icon: CalendarClock,
      submenu: [
        {
          title: 'Upcoming Appointment',
          url: '/patient/upcoming-appointments'
        },
        {
          title: 'Book Appointmentt',
          url: '/patient/book-appointments'
        },
        {
          title: 'Past Appointmentt',
          url: '/patient/past-appointments'
        }
      ]
    },
    {
      title: 'Test request',
      icon: TestTubeDiagonal,
      submenu: [
        {
          title: 'Available Test',
          url: '/patient/upcoming-appointments'
        },
        {
          title: 'Pending Test',
          url: '/patient/book-appointments'
        }
      ]
    },
    {
      title: 'Test Results',
      url: '/patient/result',
      icon: NotepadText
    }
  ]
};
