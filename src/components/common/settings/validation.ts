import {
  address,
  city,
  dateOfBirth,
  email,
  firstName,
  gender,
  landMark,
  lastName,
  maritalStatus,
  phoneNumber,
  state,
  zipCode
} from '@/app/auth/validation';
import { z } from 'zod';

export const ProfileSettingSchema = z.object({
  firstName,
  lastName,
  email,
  phoneNumber,
  homeAddress: address,
  city,
  state,
  landMark,
  dateOfBirth,
  maritalStatus,
  gender,
  zipCode
});

export type TProfileSettingsSchema = z.infer<typeof ProfileSettingSchema>;
