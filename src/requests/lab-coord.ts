import { TAddInventorySchema } from '@/app/(modules)/lab-coord/inventory/components/validation';
import server from '.';
import { LAB_COORD } from '@/constants/api';

type TAssignLabTechPayload = { testRequestId: string; technicianId: string };

export const postAssignLabTech = (payload: TAssignLabTechPayload) =>
  server.post(LAB_COORD.ASSIGN_TECHNICIAN, payload);

export const postCreateInventory = (payload: TAddInventorySchema['items']) =>
  server.post(LAB_COORD.INVENTORY, payload);
