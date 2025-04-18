import { LAB_COORD } from '@/constants/api';
import { keys } from 'mobx';
import path from 'path';

export const labCoord = {
  getDashboard() {
    return {
      path: LAB_COORD.DASHBOARD,
      keys: () => [LAB_COORD.DASHBOARD] as const
    };
  },
  getStaffShifts() {
    return {
      path: LAB_COORD.STAFF_SHIFTS,
      Keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.STAFF_SHIFTS] as const
    };
  },

  getAllTests(query: Partial<TTestQuery>) {
    return {
      path: LAB_COORD.ALL_TESTS,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.ALL_TESTS, query] as const,
      params: query
    };
  },

  getTestByID(id: string) {
    return {
      path: LAB_COORD.GET_TEST.replace(':id', id),
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.ALL_TESTS, LAB_COORD.GET_TEST, id] as const
    };
  },

  getAvailableLabTechs() {
    return {
      path: LAB_COORD.AVAILABLE_TECHNICIAN,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.AVAILABLE_TECHNICIAN] as const
    };
  },

  getLabInventory(query: Partial<TinventoryQuery>) {
    return {
      path: LAB_COORD.INVENTORY,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.INVENTORY, query] as const,
      params: query
    };
  },

  getLabCoordQCPending(query: Partial<TTestQuery>) {
    return {
      path: LAB_COORD.QC_PENDING,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.QC_PENDING],
      params: query
    };
  },

  getLabCoordQCHistory(query: Partial<TTestQuery>) {
    return {
      path: LAB_COORD.QC_HISTORY,
      keys: () => [LAB_COORD.DASHBOARD, LAB_COORD.QC_HISTORY],
      params: query
    };
  }
};
