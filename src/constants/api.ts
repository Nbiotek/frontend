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
  RECENT_RESULT: '/patients/dashboard/recent-activiy',
  BILLING: '/payments' as string,

  APPOINTMENTS: {
    UPCOMING: '/patients/appointments/upcoming',
    PENDING: '/patients/appointments/pending',
    PAST: '/patients/appointments/past',
    CREATE: 'patients/appointments',
    DETAILS: (id: string) => `patients/appointments/${id}/show`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
    RESCHEDULE: (id: string) => `patients/appointments/${id}/reschedule`,
    PENDING_PAYMENT: (id: string) => `patients/appointments/${id}/payment/generate`,
    VERIFY_PAYMENT: (tx_Ref: string) => `/payments/verify/${tx_Ref}`
  } as const,

  TESTS: {
    ALl: '/patients/tests',
    PACKAGES: '/patients/package-tests',
    DETAILS: (id: string) => `/tests/${id}`,
    SINGLE: '/test/single'
  },

  TEST_RESULTS: {
    ALL: '/patients/test-results' as string,
    DETAILS: (id: string) => `/patients/test-results/${id}`,
    SUITE_DETAILS: (id: string) => `/patients/APPOINTMENTS/${id}/details`
  }
} as const;

export const DOCTOR = {
  DASHBOARD: '/doctors/dashboard',
  RECENT_ACTIVITY: '/doctors/recent-activity',
  TEST_REVIEW: {
    All: '/doctors/test-requests',
    DETAILS: (id: string) => `/doctors/test-requests/${id}`
  },
  APPOINTMENT: {
    ALL: '/doctors/appointments',
    CREATE: '/doctors/appointments'
  },
  REFERRALS: '/doctors/patients'
};

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
  UPDATE_TEST_STATUS: '/lab-technicians/test-requests/:id/status',
  UPADTE_AVAILABILITY: '/lab-technicians/update-availability'
} as const;

export const LAB_COORD = {
  ALL_TESTS: '/lab-coordinator/test-requests',
  GET_TEST: '/lab-coordinator/test-requests/:id',
  DASHBOARD: '/lab-coordinator/dashboard',
  STAFF_SHIFTS: '/lab-coordinator/staff-shifts',
  AVAILABLE_TECHNICIAN: '/lab-coordinator/available-technicians',
  ASSIGN_TECHNICIAN: '/lab-coordinator/test-requests-assign-technician',
  INVENTORY: '/lab-coordinator/inventory',
  QC_PENDING: '/lab-coordinator/test-quality-control',
  QC_HISTORY: '/lab-coordinator/quality-control-history'
} as const;
