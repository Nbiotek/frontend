import { QUALITY_CONTROL, RECEPTIONIST } from '@/constants/api';
import server from '.';

export const putUpdateAppt = ({
  id,
  payload
}: {
  id: string;
  payload: TReceptUpdateApptPayload;
}) => {
  return server.put<INBTServerResp<string>>(
    RECEPTIONIST.UPDATE_APPOINTMENT.replace(':id', id),
    payload
  );
};
