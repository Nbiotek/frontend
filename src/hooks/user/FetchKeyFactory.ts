import { AUTH } from '@/constants/api';

export const user = {
  getProfile() {
    return {
      path: AUTH.GET_PROFILE,
      keys: () => [AUTH.GET_PROFILE] as const
    };
  },

  getPatients(query: Partial<TReceptionistQuery>) {
    return {
      path: AUTH.ALL_PATIENT,
      keys: () => [AUTH.ALL_PATIENT, query] as const,
      params: query
    };
  },

  getSinglePatientInfo(id: string) {
    return {
      path: AUTH.SINGLE_PATIENT.replace(':id', id),
      keys: () => [AUTH.SINGLE_PATIENT, id] as const
    };
  },

  getSinglePatientAppt(id: string) {
    return {
      path: AUTH.PATIENT_APPOINTMENTS.replace(':id', id),
      keys: () => [AUTH.PATIENT_APPOINTMENTS, id] as const
    };
  }
};
