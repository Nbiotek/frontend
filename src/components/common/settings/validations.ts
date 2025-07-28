import { z } from 'zod';
import {
  address,
  city,
  confirmPassword,
  dateOfBirth,
  email,
  firstName,
  gender,
  landMark,
  lastName,
  maritalStatus,
  password,
  phoneNumber,
  state,
  zipCode
} from '@/app/auth/validation';

export const RecoveryEmailSchema = z.object({
  recoveryEmail: email
});

export const RecoveryPhoneSchema = z.object({
  recoveryPhone: phoneNumber
});

export const UpdatePwdSchema = z
  .object({
    currentPassword: password,
    newPassword: password,
    confirmPassword
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'new password must be different from current password.',
    path: ['newPassword']
  });

export const NotificationSchema = z
  .object({
    pushNotification: z.boolean(),
    emailNotification: z.boolean()
  })
  .partial();

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

export type TRecoveryEmailSchema = z.infer<typeof RecoveryEmailSchema>;
export type TRecoveryPhoneSchema = z.infer<typeof RecoveryPhoneSchema>;
export type TUpdatePwdSchema = z.infer<typeof UpdatePwdSchema>;
export type TNotificationSchema = z.infer<typeof NotificationSchema>;
export type TProfileSettingsSchema = z.infer<typeof ProfileSettingSchema>;
