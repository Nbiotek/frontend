import { QUALITY_CONTROL } from '@/constants/api';
import { QUERY_KEY } from '@/constants/data';

export const qualityControl = {
  getHistory(query: Partial<TTestQuery>) {
    return {
      path: QUALITY_CONTROL.HISTORY,
      keys: () => [QUERY_KEY.LAB_DASHBOARD, QUALITY_CONTROL.HISTORY, query] as const,
      params: query
    };
  },

  getPending(query: Partial<TTestQuery>) {
    return {
      path: QUALITY_CONTROL.PENDING,
      keys: () =>
        [QUERY_KEY.LAB_DASHBOARD, QUALITY_CONTROL.HISTORY, QUALITY_CONTROL.PENDING, query] as const,
      params: query
    };
  }
};
