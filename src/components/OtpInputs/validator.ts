import { z } from 'zod';

export const OTPValidationSchema = z.object({
  otp_0: z.string().trim().min(1, { message: 'error here.' }).max(1, { message: 'error here.' }),
  otp_1: z.string().trim().min(1, { message: 'error here.' }).max(1, { message: 'error here.' }),
  otp_2: z.string().trim().min(1, { message: 'error here.' }).max(1, { message: 'error here.' }),
  otp_3: z.string().trim().min(1, { message: 'error here.' }).max(1, { message: 'error here.' }),
  otp_4: z.string().trim().min(1, { message: 'error here.' }).max(1, { message: 'error here.' })
});

export type TOTP = z.infer<typeof OTPValidationSchema>;
