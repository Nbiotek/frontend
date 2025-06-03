import { email, firstName, lastName, password, phoneNumber } from '@/app/auth/validation';
import z from 'zod';

export const AdminAddUserSchema = z.object({
  firstName,
  lastName,
  email,
  role: z.string({ required_error: 'Select a role' }).trim().min(1, { message: 'Select role.' }),
  phoneNumber
});

export type TAdminAdduserSchema = z.infer<typeof AdminAddUserSchema>;
