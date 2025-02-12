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

const firstName = z
  .string()
  .trim()
  .min(3, { message: 'First Name is required.' })
  .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.');

const lastName = z
  .string()
  .trim()
  .min(3, { message: 'Last Name is required.' })
  .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.');

const phoneNumber = z
  .string({ required_error: 'Phone number is required.' })
  .trim()
  .superRefine((val, ctx) => {
    if (upperCaseRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone Number can not contain uppercase letters.'
      });
    }

    if (!val.startsWith('0')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number must start with 0.'
      });
    }

    if (lowerCaseRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone Number can not contain lowercase letters.'
      });
    }
    if (specialCharcterRegex.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone Number can not contain special letters.'
      });
    }

    if (val.length > 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number can not be more than 10 digits.'
      });
    }
  });

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
    firstName,
    lastName,
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

export const PatientPersonalSchema = z.object({
  firstName,
  lastName,
  email,
  phoneNumber,
  maritalStatus: z.string({ required_error: 'Marital status is required.' }).trim(),
  gender: z.string({ required_error: 'Gender is required.' }).trim(),
  dob: z.string({ required_error: 'Date of birth is required.' }).trim(),
  weight: z.string({ required_error: 'Gender is required.' }).trim().optional(),
  height: z.string({ required_error: 'Gender is required.' }).trim().optional(),
  primaryCarePhysician: z.string({ required_error: 'Gender is required.' }).trim().optional()
});

export const PatientContactSChema = z.object({
  homeAddress: z.string({ required_error: 'Address is required.' }).trim(),
  city: z.string({ required_error: 'City is required.' }).trim(),
  state: z.string({ required_error: 'State is required.' }).trim(),
  landMark: z.string({ required_error: 'Address is required.' }).trim().optional(),
  zipCode: z.string({ required_error: 'Zip code is required.' }).trim(),

  emergencyContact: z.object({
    firstName,
    lastName,
    address: z.string({ required_error: 'Address is required.' }).trim(),
    phoneNumber
  })
});

export const PatientInsuranceSchema = z.object({
  primaryInsuranceProvider: z
    .string({ required_error: 'Primary insurance is required.' })
    .trim()
    .optional(),
  insurancePlanName: z
    .string({ required_error: 'Insurance plan name is required.' })
    .trim()
    .optional(),
  policyNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional(),
  insurancePhoneNumber: z.string({ required_error: 'Phone number is required.' }).trim(),
  policyHolder: z.object({
    firstName,
    lastName,
    phoneNumber
  })
});

export type TAuthLoginResponse = INBTServerResp<z.infer<typeof AuthLoginResponseSchema>>;
export type TLogin = z.infer<typeof LoginValidationSchema>;
export type TCreateAccount = z.infer<typeof CreateAccountValidationSchema>;
export type TPwdSchema = z.infer<typeof PwdSchema>;
export type TNewPwdSchema = z.infer<typeof NewPwdSchema>;
export type TForgotPwd = z.infer<typeof ForgotPwdSchema>;
export type TPatientPersonalSchema = z.infer<typeof PatientPersonalSchema>;
export type TPatientContactSChema = z.infer<typeof PatientContactSChema>;
export type TPatientInsuranceSchema = z.infer<typeof PatientInsuranceSchema>;
