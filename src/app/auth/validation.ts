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
const confirm_password = z.string().trim().min(1, { message: 'Confirm password is required.' });

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
    first_name: z
      .string()
      .trim()
      .min(3, { message: 'First Name is required.' })
      .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.'),
    last_name: z
      .string()
      .trim()
      .min(3, { message: 'Last Name is required.' })
      .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.'),
    email,
    role: z.string({ required_error: 'Select a role' }).trim().min(1, { message: 'Select role.' }),
    password,
    confirm_password
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match.',
    path: ['confirm_password']
  });

export const PwdSchema = z
  .object({
    password,
    new_password: password,
    confirm_password
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Passwords do not match.',
    path: ['confirm_password']
  });

export const NewPwdSchema = z
  .object({
    password,
    confirm_password
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match.',
    path: ['confirm_password']
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
