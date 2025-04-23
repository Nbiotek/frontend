import { LAB_TECH, TEST } from '@/constants/api';

export const labTech = {
  getRecentActivities() {
    return {
      path: LAB_TECH.RECENT_ACTIVITIES,
      keys: () => [LAB_TECH.RECENT_ACTIVITIES] as const
    };
  },

  getTestQueue(query: Partial<TTestQuery>) {
    return {
      path: TEST.ASSIGNED_TESTS,
      keys: () => [LAB_TECH.RECENT_ACTIVITIES, TEST.ASSIGNED_TESTS, query] as const,
      params: query
    };
  },
  getTestByID(id: string) {
    return {
      path: TEST.GET_SINGLE_REQUEST.replace(':id', id),
      keys: () =>
        [LAB_TECH.RECENT_ACTIVITIES, TEST.ASSIGNED_TESTS, TEST.GET_SINGLE_REQUEST, id] as const
    };
  }
};
