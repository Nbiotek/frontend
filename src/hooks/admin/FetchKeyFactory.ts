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
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.USERS, query] as const,
      params: query
    };
  },

  getSingleTest() {
    return {
      path: SUPER_ADMIN.SINGLE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_TEST] as const
    };
  },

  getPackageTest() {
    return {
      path: SUPER_ADMIN.PACKAGE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.PACKAGE_TEST] as const
    };
  },

  getTestById(id: string) {
    return {
      path: SUPER_ADMIN.TEST_ID.replace(':id', id),
      keys: () => [SUPER_ADMIN.TEST_ID, id] as const
    };
  }
};
