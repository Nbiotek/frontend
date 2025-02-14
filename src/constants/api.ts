export const AUTH = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  OTP: '/users/verify-otp',
  GET_PROFILE: '/users/profile',
  NEW_ACCESS_TOKEN: '/users/refresh-token',
  FORGOT_PWD: '/users/forgot-password',
  NEW_PWD: '/users/reset-password',
  CHANGE_PWD: '',
  RESEND_EMAIL_VERIFICATION: '/users/resend-email-verification'
} as const;

export const PATIENT = {
  PERSONAL_REG: '/patients/register'
} as const;
