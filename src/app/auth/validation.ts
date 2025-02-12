import { upperCaseRegex, lowerCaseRegex, numberRegex, specialCharcterRegex } from '@/utils';
import { z } from 'zod';

const email = z.string({ required_error: 'Email is required.' }).email('Invalid email address.');
const password = z
  .string({ required_error: 'Password is required.' })
  .min(8, {
    message: 'Must contain at least an uppercase, lowercase, special character and a number.'
  })
  .refine((value) => upperCaseRegex.test(value), 'Password must contain atleast an uppercase.')
  .refine((value) => numberRegex.test(value), 'Password must contain atleast a number.')
  .refine(
    (value) => specialCharcterRegex.test(value),
    'Password must contain at least a special character.'
  )
  .refine((value) => lowerCaseRegex.test(value), 'Password must contain atleast a lowercase.');
const confirmPassword = z.string().trim().min(1, { message: 'Confirm password is required.' });

export const AuthLoginResponseSchema = z.object({
  access_token: z.string(),
  email_verified: z.boolean()
});

export const LoginValidationSchema = z.object({
  email,
  password
});

export const CreateAccountValidationSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, { message: 'First Name is required.' })
      .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.'),
    lastName: z
      .string()
      .trim()
      .min(3, { message: 'Last Name is required.' })
      .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.'),
    email,
    role: z.string({ required_error: 'Select a role' }).trim().min(1, { message: 'Select role.' }),
    password,
    confirmPassword
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const PwdSchema = z
  .object({
    password,
    new_password: password,
    confirmPassword
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const NewPwdSchema = z
  .object({
    newPassword: password,
    confirmPassword
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  });

export const ForgotPwdSchema = z.object({
  email
});

export type TAuthLoginResponse = INBTServerResp<z.infer<typeof AuthLoginResponseSchema>>;
export type TLogin = z.infer<typeof LoginValidationSchema>;
export type TCreateAccount = z.infer<typeof CreateAccountValidationSchema>;
export type TPwdSchema = z.infer<typeof PwdSchema>;
export type TNewPwdSchema = z.infer<typeof NewPwdSchema>;
export type TForgotPwd = z.infer<typeof ForgotPwdSchema>;
