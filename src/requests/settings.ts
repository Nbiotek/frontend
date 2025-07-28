import server from '.';
import { SETTINGS } from '@/constants/api';
import {
  TProfileSettingsSchema,
  TRecoveryEmailSchema,
  TRecoveryPhoneSchema,
  TUpdatePwdSchema
} from '@/components/common/settings/validations';

export const putProfileSettings = async (payload: Partial<TProfileSettingsSchema>) => {
  if (payload.dateOfBirth) {
    payload.dateOfBirth = payload.dateOfBirth.toDateString() as unknown as Date;
  }
  return server.put<INBTServerResp<{}>>(SETTINGS.PROFILE, payload);
};

export const postPwdSettings = async (payload: TUpdatePwdSchema) =>
  server.post<INBTServerResp<{}>>(SETTINGS.UPDATE_PWD, payload);

export const putRecoveryContactSettings = async (
  payload: TRecoveryEmailSchema | TRecoveryPhoneSchema
) => server.put<INBTServerResp<TRecoveryContactSettings>>(SETTINGS.RECOVERY_CONTACT, payload);
