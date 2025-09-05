import { LAB_COORD, TEST } from '@/constants/api';

export const labCoord = {
  getDashboard() {
    return {
      path: LAB_COORD.DASHBOARD,
      keys: () => [LAB_COORD.DASHBOARD] as const
    };
  },

  getAllTests(query: Partial<TTestQuery>) {
    return {
      path: TEST.GET_REQUESTS,
      keys: () => [LAB_COORD.DASHBOARD, TEST.GET_REQUESTS, query] as const,
      params: query
    };
  },

  getTestByID(id: string) {
    return {
      path: TEST.GET_SINGLE_REQUEST.replace(':id', id),
      keys: () => [LAB_COORD.DASHBOARD, TEST.GET_REQUESTS, TEST.GET_SINGLE_REQUEST, id] as const
    };
  },

  getTestResultByID(id: string) {
    return {
      path: TEST.GET_SINGLE_RESULT.replace(':id', id),
      keys: () => [LAB_COORD.DASHBOARD, TEST.GET_REQUESTS, TEST.GET_SINGLE_RESULT, id] as const
    };
  },

  getAvailableLabTechs() {
    return {
      path: LAB_COORD.AVAILABLE_TECHNICIAN,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.AVAILABLE_TECHNICIAN] as const
    };
  },

  getAvailableMarketers() {
    return {
      path: LAB_COORD.AVAILABLE_MARKETERS,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.AVAILABLE_MARKETERS] as const
    };
  },

  getAvailableDoctors() {
    return {
      path: LAB_COORD.AVAILABLE_DOCTORS,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.AVAILABLE_DOCTORS] as const
    };
  },

  getLabInventory(query: Partial<TinventoryQuery>) {
    return {
      path: LAB_COORD.INVENTORY,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.INVENTORY, query] as const,
      params: query
    };
  },

  getAssignedTests(query: Partial<TTestQuery>) {
    return {
      path: TEST.ALL_ASSIGNED,
      keys: () => [LAB_COORD.DASHBOARD, TEST.GET_REQUESTS, TEST.ALL_ASSIGNED, query] as const,
      params: query
    };
  }
};
