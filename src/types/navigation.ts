import { LucideIcon } from 'lucide-react';

export type UserRole = 'patient';

// | 'doctor' | 'lab_technician' | 'sub_admin' | 'super_admin'

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
