import { TProfileSettingsSchema } from '@/components/common/settings/validation';
import server from '.';
import { SETTINGS } from '@/constants/api';

export const putProfileSettings = async (payload: Partial<TProfileSettingsSchema>) => {
  if (payload.dateOfBirth) {
    payload.dateOfBirth = payload.dateOfBirth.toDateString() as unknown as Date;
  }
  return server.put<INBTServerResp<{}>>(SETTINGS.PROFILE, payload);
};
