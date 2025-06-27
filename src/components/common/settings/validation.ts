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

export const ProfileSettingSchema = z
  .object({
    firstName,
    lastName,
    email,
    phoneNumber,
    contactAddress: address,
    city,
    state,
    landMark,
    dateOfBirth,
    maritalStatus,
    gender,
    zipCode
  })
  .partial();

export type TProfileSettingsSchema = z.infer<typeof ProfileSettingSchema>;
