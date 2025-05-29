import { SUPER_ADMIN } from '@/constants/api';

export const superAdmin = {
  getDashboard() {
    return {
      path: SUPER_ADMIN.DASHBOARD,
      keys: () => [SUPER_ADMIN.DASHBOARD] as const
    };
  },

  getUsers(query: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.USERS,
      keys: () => [SUPER_ADMIN.USERS] as const,
      params: query
    };
  }
};
