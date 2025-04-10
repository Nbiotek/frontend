import { TAddInventorySchema } from '@/app/(modules)/lab-coord/inventory/components/validation';
import server from '.';
import { LAB_COORD } from '@/constants/api';
import { EnumResultStatus, EnumTestStatus } from '@/atoms/Buttons/Status';

type TAssignLabTechPayload = { testRequestId: string; technicianId: string };

export const postAssignLabTech = (payload: TAssignLabTechPayload) =>
  server.post(LAB_COORD.ASSIGN_TECHNICIAN, payload);

export const putReassignLabTech = (payload: TAssignLabTechPayload) =>
  server.put(LAB_COORD.REASSIGN_TECHNICIAN, payload);

export const postCreateInventory = (payload: TAddInventorySchema['items']) =>
  server.post(LAB_COORD.INVENTORY, payload);

export const putQCStatusUpdate = (payload: { status: EnumResultStatus; testId: string }) =>
  server.put<INBTServerResp<string>>(LAB_COORD.QC_STATUS_UPDATE.replaceAll(':id', payload.testId), {
    status: payload.status
  });
