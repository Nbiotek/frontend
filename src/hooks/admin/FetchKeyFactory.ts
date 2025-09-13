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

  getSingleTest(query: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.SINGLE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_TEST],
      params: query
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
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.TEST_ID, id] as const
    };
  },

  getPackageTestById(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_PACKAGE_TEST.replace(':id', id),
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_PACKAGE_TEST, id] as const
    };
  },

  getTestResultChart(query: TChartQuery) {
    return {
      path: SUPER_ADMIN.RESULT_CHART,
      keys: () => [SUPER_ADMIN.RESULT_CHART, query],
      params: query
    };
  },

  getPaymentChart(query: TChartQuery) {
    return {
      path: SUPER_ADMIN.PAYMENT_CHART,
      keys: () => [SUPER_ADMIN.PAYMENT_CHART, query],
      params: query
    };
  },

  getHeroSection() {
    return {
      path: SUPER_ADMIN.LANDING_PAGE,
      keys: () => [SUPER_ADMIN.LANDING_PAGE]
    };
  },

  getHeroSectionId(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_LANDING.replace(':id', id),
      keys: () => [SUPER_ADMIN.LANDING_PAGE, SUPER_ADMIN.SINGLE_LANDING, id]
    };
  }
};
