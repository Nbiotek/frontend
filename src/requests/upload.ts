import { UPLOADS } from '@/constants/api';
import server from '.';

export const postUploadedFile = async (payload: Partial<IMedia>) =>
  server.post<INBTServerResp<IMediaResp>>(UPLOADS.ADD, payload);

export const delUploadedFile = async (payload: { publicId: string }) =>
  server.delete<INBTServerResp<string>>(UPLOADS.DELETE, { data: payload });
