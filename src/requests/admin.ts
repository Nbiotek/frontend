import server from '.';
import { SUPER_ADMIN } from '@/constants/api';
import { TAdminAdduserSchema } from '@/app/(modules)/admin/user-management/validation';
import {
  TAdminCreateHeroSchema,
  TAdminHeroCarouselSchema
} from '@/app/(modules)/admin/content-management/hero/validation';
import { TAdminHeroCarousel } from '@/store/AdminStore';

export interface IPostAddSingleTest {
  name: string;
  description: string;
  category: string;
  price: number;
  discountedPrice: number;
  requirements: Array<string>;
}

export interface IPostAddPackageTest {
  name: string;
  description: string;
  requirements: Array<string>;
  testIds: Array<string>;
  price?: number;
  discountedPrice?: number;
}

// get
export const getSingleTests = async (params: TGeneralPaginatedQuery) => {
  return server.get<INBTServerResp<INBTPaginatedData<TAdminTestItemBase>>>(
    SUPER_ADMIN.SINGLE_TEST,
    {
      params
    }
  );
};

// post requests
export const postAdduser = async (payload: TAdminAdduserSchema) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.ADD_USER, payload);

export const postAddSingleTest = async (payload: IPostAddSingleTest) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.CREATE_SINGLE_TEST, payload);

export const postAddPackageTest = async (payload: IPostAddPackageTest) =>
  server.post<INBTServerResp<string>>(SUPER_ADMIN.CREATE_PACKAGE_TEST, payload);

export const postCreateHeroLanding = async (payload: TAdminCreateHeroSchema) =>
  server.post(SUPER_ADMIN.CREATE_LANDING, payload);

// put requests
export const putUpdateSingleTest = async ({
  id,
  payload
}: {
  id: string;
  payload: Partial<IPostAddSingleTest>;
}) => server.put(SUPER_ADMIN.UPDATE_SINGLE_TEST.replace(':id', id), payload);

export const putUpdatePackageTest = async ({
  id,
  payload
}: {
  id: string;
  payload: Partial<IPostAddPackageTest>;
}) => server.put(SUPER_ADMIN.UPDATE_PACKAGE_TEST.replace(':id', id), payload);

export const putUpdateHero = async (
  payload: Partial<TAdminCreateHeroSchema | TAdminHeroCarousel>
) => server.put(SUPER_ADMIN.CREATE_LANDING, payload);

export const putUpdateHeroCarousel = async (
  id: string,
  payload: Partial<TAdminHeroCarouselSchema>
) => server.put(SUPER_ADMIN.SINGLE_LANDING.replace(':id', id), payload);

export const suspendUser = async (id: string) =>
  server.put(SUPER_ADMIN.SUSPEND_USER.replace(':id', id));

export const unSuspendUser = async (id: string) => {
  return server.put(SUPER_ADMIN.UNSUSPEND_USER.replace(':id', id), { status: 'active' });
};
export const toggleTestAvailability = async (arg: {
  type: string;
  id: string;
  payload: { status: string };
}) => {
  const { type, id, payload } = arg;
  return server.put(
    type === 'single'
      ? SUPER_ADMIN.TOGGLE_TEST_AVAILABILITY.replace(':id', id)
      : SUPER_ADMIN.TOGGLE_PACKAGE_TEST.replace(':id', id),
    payload
  );
};

// delete requests
export const deleteUser = async (id: string) =>
  server.delete(SUPER_ADMIN.DELETE_USER.replace(':id', id));

export const delHeroCarousel = async (id: string) =>
  server.delete(SUPER_ADMIN.SINGLE_LANDING.replace(':id', id));
