import {
  Home,
  User,
  CalendarClock,
  TestTubeDiagonal,
  NotepadText,
  CreditCard,
  Phone,
  LayoutDashboard,
  Hospital,
  ClipboardList,
  UserCircle,
  FileText,
  Settings,
  ShieldCheck,
  Bell,
  Book,
  BellDot,
  PhoneCall,
  Settings2,
  UsersIcon,
  PhoneCallIcon,
  FilesIcon,
  FileTextIcon,
  UserCircle2Icon,
  NotebookIcon,
  SettingsIcon,
  User2Icon,
  FolderPenIcon
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { EnumRole } from '@/constants/mangle';
import ROUTES from '@/constants/routes';

export type UserRole = 'patient';

export interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  isNestable?: boolean;
  submenu?: Array<{
    title: string;
    url: string;
    isNestable?: boolean;
  }>;
}

export interface WebsiteMenu {
  title: string;
  url: string;
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
      title: ROUTES.DOCTOR_APPOINTMENT.title,
      icon: CalendarClock,
      submenu: [
        {
          title: 'All ',
          url: ROUTES.DOCTOR_APPOINTMENT.path
        },
        {
          title: 'Create',
          url: ROUTES.DOCTOR_CREATE_APPOINTMENT.path
        }
      ]
    },
    {
      title: ROUTES.DOCTOR_REFERRALS.title,
      url: ROUTES.DOCTOR_REFERRALS.path,
      icon: Hospital
    },
    {
      title: ROUTES.DOCTOR_HELP_SUPPORT.title,
      url: ROUTES.DOCTOR_HELP_SUPPORT.path,
      icon: PhoneCall
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
      icon: TestTubeDiagonal,
      isNestable: true
    },
    {
      title: ROUTES.LAB_TECH_RESULT_HISTORY.title,
      icon: Book,
      url: ROUTES.LAB_TECH_RESULT_HISTORY.path,
      isNestable: true
    },
    {
      title: ROUTES.LAB_TECH_QUALITY_CONTROL.title,
      icon: ShieldCheck,
      url: ROUTES.LAB_TECH_QUALITY_CONTROL.path,
      isNestable: true
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
      icon: TestTubeDiagonal,
      isNestable: true
    },
    {
      title: ROUTES.LAB_COORD_QUALITY_CONTROL.title,
      url: ROUTES.LAB_COORD_QUALITY_CONTROL.path,
      icon: ShieldCheck,
      isNestable: true
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
  ],
  [EnumRole.MARKETER]: [
    {
      title: ROUTES.MARKETER.title,
      url: ROUTES.MARKETER.path,
      icon: Home
    },
    {
      title: ROUTES.MARKETER_FIELD_VISIT.title,
      url: ROUTES.MARKETER_FIELD_VISIT.path,
      icon: UsersIcon
    },
    {
      title: ROUTES.MARKETER_SETTINGS.title,
      url: ROUTES.MARKETER_SETTINGS.path,
      icon: Settings
    }
  ],

  [EnumRole.RECEPTIONIST]: [
    {
      title: ROUTES.RECPTS.title,
      url: ROUTES.RECPTS.path,
      icon: Home
    },

    {
      title: ROUTES.RECPTS_APOINTMENT.title,
      url: ROUTES.RECPTS_APOINTMENT.path,
      icon: CalendarClock
    },

    {
      title: ROUTES.RECPTS_PATIENT.title,
      url: ROUTES.RECPTS_PATIENT.path,
      icon: UserCircle2Icon,
      isNestable: true
    },

    {
      title: ROUTES.RECPTS_NOTIFICATIONS.title,
      url: ROUTES.RECPTS_NOTIFICATIONS.path,
      icon: Bell
    },

    {
      title: ROUTES.RECPTS_SETTINGS.title,
      url: ROUTES.RECPTS_SETTINGS.path,
      icon: SettingsIcon
    },

    {
      title: ROUTES.RECPTS_SUPPORT.title,
      url: ROUTES.RECPTS_SUPPORT.path,
      icon: Phone
    }
  ],

  [EnumRole.SUPER_ADMIN]: [
    {
      title: ROUTES.SUPER_ADMIN.title,
      url: ROUTES.SUPER_ADMIN.path,
      icon: Home
    },
    {
      title: ROUTES.SUPER_ADMIN_USER_MANAGEMENT.title,
      url: ROUTES.SUPER_ADMIN_USER_MANAGEMENT.path,
      icon: User2Icon
    },
    {
      title: ROUTES.SUPER_ADMIN_CONTENT_MANAGEMENT.title,
      url: ROUTES.SUPER_ADMIN_CONTENT_MANAGEMENT.path,
      icon: FolderPenIcon
    },
    {
      title: ROUTES.DOCTOR_SETTINGS.title,
      url: ROUTES.DOCTOR_SETTINGS.path,
      icon: Settings
    }
  ]
};

export const defaultMenuConfig: WebsiteMenu[] = [
  {
    title: ROUTES.HOME.title,
    url: ROUTES.HOME.path
  },
  {
    title: ROUTES.LAB_TEST.title,
    url: ROUTES.LAB_TEST.path
  },
  {
    title: ROUTES.SPECIAL_PACKAGES.title,
    url: ROUTES.SPECIAL_PACKAGES.path
  },
  {
    title: ROUTES.ADVANCED_IMAGING.title,
    url: ROUTES.ADVANCED_IMAGING.path
  },
  {
    title: ROUTES.MOLECULAR_DIAGNOSTICS.title,
    url: ROUTES.MOLECULAR_DIAGNOSTICS.path
  },
  {
    title: ROUTES.BIO_HUB.title,
    url: ROUTES.BIO_HUB.path
  },
  {
    title: ROUTES.ECOMMERCE.title,
    url: ROUTES.ECOMMERCE.path
  },
  {
    title: ROUTES.WHATS_NEW.title,
    url: ROUTES.WHATS_NEW.path
  }
];
