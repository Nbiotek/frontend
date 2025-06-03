import { TAdminAdduserSchema } from '@/app/(modules)/admin/user-management/validation';
import server from '.';
import { SUPER_ADMIN } from '@/constants/api';

// post requests
export const postAdduser = async (payload: TAdminAdduserSchema) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.ADD_USER, payload);
