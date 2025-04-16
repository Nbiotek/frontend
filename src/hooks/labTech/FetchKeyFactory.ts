import { LAB_TECH } from '@/constants/api';

export const labTech = {
  getRecentActivities() {
    return {
      path: LAB_TECH.RECENT_ACTIVITIES,
      keys: () => [LAB_TECH.RECENT_ACTIVITIES] as const
    };
  },

  getTestQueue(query: Partial<TTestQuery>) {
    return {
      path: LAB_TECH.ALL_TESTS,
      keys: () => [LAB_TECH.RECENT_ACTIVITIES, LAB_TECH.ALL_TESTS, query] as const,
      params: query
    };
  },
  getTestByID(id: string) {
    return {
      path: LAB_TECH.GET_TEST.replace(':id', id),
      keys: () => [LAB_TECH.RECENT_ACTIVITIES, LAB_TECH.ALL_TESTS, LAB_TECH.GET_TEST, id] as const
    };
  }
};
