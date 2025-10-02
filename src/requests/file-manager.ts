import { FILE_MANAGER } from '@/constants/api';
import server from '.';

export const putUpdateVisibility = (uuid: string) =>
  server.put<
    INBTServerResp<{
      uuid: string;
      visibiltyStatus: string;
    }>
  >(`${FILE_MANAGER.UPDATE_VISIBILITY.replace(':uuid', uuid)}`);
