export const AUTH = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  OTP: '/users/verify-otp',
  GET_PROFILE: '/users/profile',
  NEW_ACCESS_TOKEN: '/users/refresh-token',
  FORGOT_PWD: '/users/forgot-password',
  NEW_PWD: '/users/reset-password',
  CHANGE_PWD: '',
  RESEND_EMAIL_VERIFICATION: '/users/resend-email-verification',
  UPDATE_PATIENT_PROFILE: '/users/patient/update-profile',
  ALL_PATIENT: '/users/patient/all'
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
    ALl: '/tests/all-tests',
    PACKAGES: '/tests/package-tests',
    DETAILS: (id: string) => `/tests/${id}`,
    SINGLE: '/test/single'
  },

  TEST_RESULTS: {
    ALL: 'tests/test-results' as string,
    DETAILS: (id: string) => `/tests/test-results/${id}`,
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
    ALL: '/doctors/appointments/booked-by-doctor',
    CREATE: '/doctors/appointments'
  },
  REFERRALS: '/doctors/patients'
};

export const MARKETER = {
  DASHBOARD: '/marketer/dashboard',
  FIELD_TASK_OVERVIEW: '/marketer/field-tasks/overview',
  FIELD_TASK_HISTORY: '/marketer/field-tasks/overview-history',
  SHOW_FIELD_TASK: '/marketer/field-tasks/:id',
  LOG_SAMPLES: {
    All: '/marketer/field-tasks/overview?status=pending',
    UPLOAD: '/marketer/field-tasks/:id/log-samples',
    UPDATE_FIELD_VISIT: 'marketer/field-tasks/:id/status'
  }
};

export const LAB_TECH = {
  DASHBOARD: '/lab-technicians/dashboard',
  RECENT_ACTIVITIES: '/lab-technicians/dashboard/recent-activities',
  ALL_TESTS: '/lab-technicians/test-requests',
  GET_TEST: '/lab-technicians/test-requests/:id',
  RECENT_RESULTS: '/lab-technicians/recent-test-results',
  ARCHIVED_RESULTS: '/lab-technicians/archived-test-results',
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
  AVAILABLE_MARKETERS: '/lab-coordinator/available-marketers',
  INVENTORY: '/lab-coordinator/inventory'
} as const;

export const QUALITY_CONTROL = {
  PENDING: '/qc/pending',
  HISTORY: '/qc/history',
  UPDATE_STATUS: '/qc/status/:id'
};

export const TEST = {
  GET_ALL: '/tests/all-tests',
  GET_SINGLE: '/tests/single/:id',
  UPDATE_TEST: '/tests/update/:id',
  TOGGLE_STATUS: '/tests/toggle-status/:id',
  GET_RESULTS: '/tests/test-results',
  GET_SINGLE_RESULT: '/tests/test-results/:id',
  GET_REQUESTS: '/tests/test-requests',
  GET_SINGLE_REQUEST: '/tests/test-requests/single/:id',
  UPLOAD_RESULT: '/tests/upload-test-result/:id',
  ASSIGN_TEST: '/tests/assign-technician',
  REASSIGN_TEST: '/tests/reassign-technician',
  ASSIGN_MARKETER: '/tests/assign-marketer',
  REASSIGN_MARKETER: '/tests/reassign-marketer',
  ASSIGNED_TESTS: '/tests/fetch-assigned-test',
  SINGLE_ASSIGNED_TESTS: '/tests/fetch-assigned-test/:id'
};

export const RECEPTIONIST = {
  APPOINTMENTS: '/receptionist/appointments',
  SINGLE_APPOINTMENT: '/receptionist/appointment/:id',
  UPDATE_APPOINTMENT: '/receptionist/appointments/update/:id'
};
