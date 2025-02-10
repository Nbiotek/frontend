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

export type TLogin = z.infer<typeof LoginValidationSchema>;
export type TCreateAccount = z.infer<typeof CreateAccountValidationSchema>;
