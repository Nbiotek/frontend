import { confirmPassword, email, password, phoneNumber } from '@/app/auth/validation';
import { z } from 'zod';

export const RecoveryEmailSchema = z.object({
  email
});

export const RecoveryPhoneSchema = z.object({
  phoneNumber
});

export const UpdatePwdSchema = z
  .object({
    old_password: password,
    new_password: password,
    confirmPassword
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export type TRecoveryEmailSchema = z.infer<typeof RecoveryEmailSchema>;
export type TRecoveryPhoneSchema = z.infer<typeof RecoveryPhoneSchema>;
export type TUpdatePwdSchema = z.infer<typeof UpdatePwdSchema>;
