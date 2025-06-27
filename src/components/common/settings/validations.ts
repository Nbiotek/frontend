import { confirmPassword, email, password, phoneNumber } from '@/app/auth/validation';
import { z } from 'zod';

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

export type TRecoveryEmailSchema = z.infer<typeof RecoveryEmailSchema>;
export type TRecoveryPhoneSchema = z.infer<typeof RecoveryPhoneSchema>;
export type TUpdatePwdSchema = z.infer<typeof UpdatePwdSchema>;
