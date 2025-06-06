import server from '.';
import { SUPER_ADMIN } from '@/constants/api';
import { TAdminAdduserSchema } from '@/app/(modules)/admin/user-management/validation';
import { TAdminSingleTestSchema } from '@/app/(modules)/admin/content-management/components/modals/validation';

export interface IPostAddSingleTest {
  name: string;
  description: string;
  category: string;
  price: number;
  discountedPrice: number;
  requirements: Array<string>;
}

// post requests
export const postAdduser = async (payload: TAdminAdduserSchema) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.ADD_USER, payload);

export const postAddSingleTest = async (payload: IPostAddSingleTest) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.CREATE_SINGLE_TEST, payload);
