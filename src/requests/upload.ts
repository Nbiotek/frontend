import { UPLOADS } from '@/constants/api';
import server from '.';

export const postUploadedFile = async (payload: Partial<IMedia>) =>
  server.post<INBTServerResp<IMediaResp>>(UPLOADS.MEDIA, payload);

export const delMediaFile = async (uuid: string) =>
  server.delete<INBTServerResp<string>>(UPLOADS.DELETE.replace(':uuid', uuid));
