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
  BILLING: '/payments',

  APPOINTMENTS: {
    UPCOMING: '/patients/appointments/upcoming',
    PENDING: '/patients/appointments/pending?sortOrder=DESC',
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
    DETAILS: (id: string) => `/patients/test-results/${id}`,
    SUITE_DETAILS: (id: string) => `/patients/APPOINTMENTS/${id}/details`
  }
} as const;

export const LAB_TECH = {
  DASHBOARD: '/lab-technicians/dashboard',
  RECENT_ACTIVITIES: '/lab-technicians/dashboard/recent-activities',
  ALL_TESTS: '/lab-technicians/test-requests',
  GET_TEST: '/lab-technicians/test-requests/:id',
  RESULT_UPLOAD: '/lab-technicians/test-requests/:id/results',
  RECENT_RESULTS: '/lab-technicians/recent-test-results',
  ARCHIVED_RESULTS: '/lab-technicians/archived-test-results',
  PENDING_QC: '/lab-technicians/test-quality-control',
  HISTORY_QC: '/lab-technicians/quality-control-history',
  UPDATE_TEST_STATUS: '/lab-technicians/test-requests/:id/status'
};
