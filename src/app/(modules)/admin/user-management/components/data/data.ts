import { Shield, Users } from 'lucide-react';
import { UserStatus } from './schema';
import { EnumRole, EnumUserStatus } from '@/constants/mangle';

export const callTypes = new Map<UserStatus, string>([
  [EnumUserStatus.ACTIVE, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [EnumUserStatus.INACTIVE, 'bg-neutral-300/40 border-neutral-300'],
  [EnumUserStatus.INVITED, 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    EnumUserStatus.SUSPENDED,
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'
  ]
]);

export const userStatus = [
  {
    label: 'Active',
    value: EnumUserStatus.ACTIVE
  },
  {
    label: 'Inactive',
    value: EnumUserStatus.INACTIVE
  },
  {
    label: 'Invited',
    value: EnumUserStatus.INVITED
  },
  {
    label: 'Suspended',
    value: EnumUserStatus.SUSPENDED
  }
];

export const userTypes = [
  {
    label: 'Super Admin',
    value: EnumRole.SUPER_ADMIN,
    icon: Shield
  },
  {
    label: 'Receptionist',
    value: EnumRole.RECEPTIONIST,
    icon: Users
  },
  {
    label: 'Lab Coordinator',
    value: EnumRole.LAB_CORDINATOR,
    icon: Users
  },
  {
    label: 'Lab Technician',
    value: EnumRole.LAB_TECHNICIAN,
    icon: Users
  },
  {
    label: 'Marketer',
    value: EnumRole.MARKETER,
    icon: Users
  },
  {
    label: 'Referal Doctor',
    value: EnumRole.REFERRAL_DOCTOR,
    icon: Users
  },
  {
    label: 'Doctor',
    value: EnumRole.DOCTOR,
    icon: Users
  },
  {
    label: 'Tech Coordinator',
    value: EnumRole.TECHNICAL_COORDINATOR,
    icon: Users
  }
] as const;
