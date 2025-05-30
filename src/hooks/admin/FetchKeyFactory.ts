import { SUPER_ADMIN } from '@/constants/api';

export const superAdmin = {
  getStats() {
    return {
      path: SUPER_ADMIN.STATS,
      keys: () => [SUPER_ADMIN.STATS] as const
    };
  },

  getUsers(query: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.USERS,
      keys: () => [SUPER_ADMIN.USERS, query] as const,
      params: query
    };
  }
};
