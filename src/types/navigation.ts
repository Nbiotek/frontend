import { LucideIcon } from 'lucide-react';

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
