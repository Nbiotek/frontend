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

  APPOINTMENTS: {
    LIST: '/appointments',
    CREATE: '/appointments',
    DETAILS: (id: string) => `/appointments/${id}`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    RESCHEDULE: (id: string) => `/appointments/${id}/reschedule`
  },
  TESTS: {
    LIST: '/tests',
    DETAILS: (id: string) => `/tests/${id}`,
    PACKAGES: '/tests/packages'
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
  HISTORY_QC: '/lab-technicians/quality-control-history'
};

export const TEST = {
  GET_TEST: '/lab-technicians/test-requests/:id'
};
