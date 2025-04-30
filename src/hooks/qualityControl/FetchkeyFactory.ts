import { QUALITY_CONTROL } from '@/constants/api';

export const qualityControl = {
  getHistory(query: Partial<TTestQuery>) {
    return {
      path: QUALITY_CONTROL.HISTORY,
      keys: () => [QUALITY_CONTROL.HISTORY, query] as const,
      params: query
    };
  },

  getPending(query: Partial<TTestQuery>) {
    return {
      path: QUALITY_CONTROL.PENDING,
      keys: () => [QUALITY_CONTROL.HISTORY, QUALITY_CONTROL.PENDING, query] as const,
      params: query
    };
  }
};
