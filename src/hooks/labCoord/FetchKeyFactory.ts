import { LAB_COORD } from '@/constants/api';

export const labCoord = {
  getStaffShifts() {
    return {
      path: LAB_COORD.STAFF_SHIFTS,
      Keys: () => [LAB_COORD.STAFF_SHIFTS] as const
    };
  }
};
