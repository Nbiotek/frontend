import { TAddInventorySchema } from '@/app/(modules)/lab-coord/inventory/components/validation';
import server from '.';
import { LAB_COORD, TEST } from '@/constants/api';

type TAssignLabTechPayload = { testRequestId: string; technicianId: string };

export const postAssignLabTech = (payload: TAssignLabTechPayload) =>
  server.post(TEST.ASSIGN_TEST, payload);

export const putReassignLabTech = (payload: TAssignLabTechPayload) =>
  server.put(TEST.REASSIGN_TEST, payload);

export const postCreateInventory = (payload: TAddInventorySchema['items']) =>
  server.post(LAB_COORD.INVENTORY, payload);
