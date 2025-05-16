import { LAB_TECH, TEST } from '@/constants/api';

export const labTech = {
  getDashboard() {
    return {
      path: LAB_TECH.DASHBOARD,
      keys: () => [LAB_TECH.DASHBOARD] as const
    };
  },

  getTestQueue(query: Partial<TTestQuery>) {
    return {
      path: TEST.ASSIGNED_TESTS,
      keys: () => [LAB_TECH.DASHBOARD, TEST.ASSIGNED_TESTS, query] as const,
      params: query
    };
  },

  getTestByID(id: string) {
    return {
      path: TEST.SINGLE_ASSIGNED_TESTS.replace(':id', id),
      keys: () => [LAB_TECH.DASHBOARD, TEST.ASSIGNED_TESTS, TEST.SINGLE_ASSIGNED_TESTS, id] as const
    };
  }
};
