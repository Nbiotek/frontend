export const AUTH = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  OTP: 'users/verify-otp'
} as const;

export const PATIENT = {
  PERSONAL: '/patients/step1',
  CONTACT: '/patients/step2',
  INSURANCE: '/patients/step3'
} as const;
