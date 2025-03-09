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
  PERSONAL_REG: '/patients/register',
  DASHBOARD: '/patients/dashboard',
  PROFILE: '/patients/profile',

  APPOINTMENTS: {
    UPCOMING: '/patients/appointments/upcoming',
    PENDING: '/patients/appointments/pending',
    PAST: '/patients/appointments/past',
    CREATE: 'patients/appointments',
    DETAILS: (id: string) => `patients/appointments/${id}/show`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    RESCHEDULE: (id: string) => `patients/appointments/${id}/reschedule`,
    PENDING_PAYMENT: (id: string) => `patients/appointments/${id}/payment/generate`,
    PAYMENT_STATUS: 'patients/appointments/payment'
  },

  TESTS: {
    ALl: '/patients/tests',
    PACKAGES: '/patients/package-tests',
    DETAILS: (id: string) => `/tests/${id}`,
    SINGLE: '/test/single'
  },

  TEST_RESULTS: {
    ALL: '/patients/test-results',
    DETAILS: (id: string) => `/test-results/${id}`
  }
} as const;
