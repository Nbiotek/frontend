export const AUTH = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  OTP: '/users/verify-otp',
  GET_PROFILE: '/users/profile',
  NEW_ACCESS_TOKEN: '/users/refresh-token',
  FORGOT_PWD: '/users/forgot-password',
  NEW_PWD: '/users/reset-password',
  CHANGE_PWD: ''
} as const;

export const PATIENT = {
  PERSONAL: '/patients/step1',
  CONTACT: '/patients/step2',
  INSURANCE: '/patients/step3'
} as const;
