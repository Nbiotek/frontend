import { AUTH } from '@/constants/api';

export const user = {
  getProfile() {
    return {
      path: AUTH.GET_PROFILE,
      keys: () => [AUTH.GET_PROFILE] as const
    };
  },

  getPatients(query: TGeneralPaginatedQuery) {
    return {
      path: AUTH.ALL_PATIENT,
      keys: () => [AUTH.ALL_PATIENT, query] as const,
      params: query
    };
  }
};
