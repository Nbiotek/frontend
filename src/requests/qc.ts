import { QUALITY_CONTROL } from '@/constants/api';
import server from '.';
import { EnumResultStatus } from '@/atoms/Buttons/Status';

export const patchQCStatusUpdate = (params: {
  id: string;
  payload: { status: EnumResultStatus };
}) => {
  const { id, payload } = params;
  return server.patch<INBTServerResp<string>>(
    QUALITY_CONTROL.UPDATE_STATUS.replaceAll(':id', id),
    payload
  );
};
