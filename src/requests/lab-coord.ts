import server from '.';
import { LAB_COORD } from '@/constants/api';

type TAssignLabTechPayload = { testRequestId: string; technicianId: string };

export const postAssignLabTech = (payload: TAssignLabTechPayload) =>
  server.post(LAB_COORD.ASSIGN_TECHNICIAN, payload);
