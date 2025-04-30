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
  .min(2, { message: 'First Name is required.' })
  .refine((value) => numberRegex.test(value) === false, 'Numbers not allowed.');

const lastName = z
  .string()
  .trim()
  .min(2, { message: 'Last Name is required.' })
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

    if (val.length > 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number can not be more than 15 digits.'
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

export const CreatePatientAcctValidationSchema = z
  .object({
    email,
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
  phoneNumber,
  maritalStatus: z.string({ required_error: 'Marital status is required.' }).trim(),
  gender: z.string({ required_error: 'Gender is required.' }).trim(),
  dateOfBirth: z.string({ required_error: 'Date of birth is required.' }).trim(),
  weight: z.string({ required_error: 'Gender is required.' }).trim().optional(),
  height: z.string({ required_error: 'Gender is required.' }).trim().optional(),
  primaryCarePhysician: z.string({ required_error: 'Gender is required.' }).trim().optional()
});

export const PatientContactSchema = z.object({
  homeAddress: z
    .string({ required_error: 'Address is required.' })
    .trim()
    .refine((value) => value !== '', 'Address is required.'),
  city: z
    .string({ required_error: 'City is required.' })
    .trim()
    .refine((value) => value !== '', 'City is required.'),
  state: z
    .string({ required_error: 'State is required.' })
    .trim()
    .refine((value) => value !== '', 'State is required.'),
  landMark: z.string({ required_error: 'Address is required.' }).trim().optional(),
  zipCode: z
    .string({ required_error: 'Zip code is required.' })
    .trim()
    .refine((value) => value !== '', 'zip code is required.'),

  emergencyContact: z.object({
    firstName,
    lastName,
    address: z
      .string({ required_error: 'Address is required.' })
      .trim()
      .refine((value) => value !== '', 'Address is required.'),
    phoneNumber
  })
});

export const PatientInsuranceSchema = z
  .object({
    primaryInsuranceProvider: z
      .string({ required_error: 'Primary insurance is required.' })
      .trim()
      .optional(),
    insurancePlanName: z
      .string({ required_error: 'Insurance plan name is required.' })
      .trim()
      .optional(),
    policyNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional(),
    groupNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional(),
    insurancePhoneNumber: z
      .string({ required_error: 'Phone number is required.' })
      .trim()
      .optional(),
    policyHolder: z
      .object({
        firstName: z.string({ required_error: 'First name is required.' }).trim().optional(),
        lastName: z.string({ required_error: 'Last name is required.' }).trim().optional(),
        phoneNumber: z.string({ required_error: 'Phone number is required.' }).trim().optional()
      })
      .optional()
  })
  .superRefine((data, ctx) => {
    const { primaryInsuranceProvider } = data;

    if (primaryInsuranceProvider) {
      // Check insurance plan name
      if (!data.insurancePlanName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Insurance plan name is required when primary insurance is provided',
          path: ['insurancePlanName']
        });
      }

      // Check policy number
      if (!data.policyNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy number is required when primary insurance is provided',
          path: ['policyNumber']
        });
      }

      // Check group number
      if (!data.groupNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Group number is required when primary insurance is provided',
          path: ['groupNumber']
        });
      }

      // Check policy holder information
      if (!data.policyHolder?.firstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy holder first name is required when primary insurance is provided',
          path: ['policyHolder', 'firstName']
        });
      }

      if (!data.policyHolder?.lastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy holder last name is required when primary insurance is provided',
          path: ['policyHolder', 'lastName']
        });
      }

      if (!data.policyHolder?.phoneNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Policy holder phone number is required when primary insurance is provided',
          path: ['policyHolder', 'phoneNumber']
        });
      } else {
        if (upperCaseRegex.test(data.policyHolder.phoneNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone Number can not contain uppercase letters.',
            path: ['policyHolder', 'phoneNumber']
          });
        }

        if (lowerCaseRegex.test(data.policyHolder.phoneNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone Number can not contain lowercase letters.',
            path: ['policyHolder', 'phoneNumber']
          });
        }
        if (specialCharcterRegex.test(data.policyHolder.phoneNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone Number can not contain special letters.',
            path: ['policyHolder', 'phoneNumber']
          });
        }

        if (data.policyHolder.phoneNumber.length > 15) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone number can not be more than 15 digits.',
            path: ['policyHolder', 'phoneNumber']
          });
        }
      }
    }
  });

export const PatientRegFormSchema =
  PatientPersonalSchema.and(PatientContactSchema).and(PatientInsuranceSchema);

export type TAuthLoginResponse = INBTServerResp<z.infer<typeof AuthLoginResponseSchema>>;
export type TLogin = z.infer<typeof LoginValidationSchema>;
export type TCreateAccount = z.infer<typeof CreateAccountValidationSchema>;
export type TCreatePatientAcct = z.infer<typeof CreatePatientAcctValidationSchema>;
export type TPwdSchema = z.infer<typeof PwdSchema>;
export type TNewPwdSchema = z.infer<typeof NewPwdSchema>;
export type TForgotPwd = z.infer<typeof ForgotPwdSchema>;
export type TPatientPersonalSchema = z.infer<typeof PatientPersonalSchema>;
export type TPatientContactSchema = z.infer<typeof PatientContactSchema>;
export type TPatientInsuranceSchema = z.infer<typeof PatientInsuranceSchema>;
export type TPatientRegForm = z.infer<typeof PatientRegFormSchema>;
