import { SETTINGS } from '@/constants/api';

export const settings = {
  getSettingsProfile() {
    return {
      path: SETTINGS.PROFILE,
      keys: () => [SETTINGS.PROFILE] as const
    };
  },

  getSettingsNotification() {
    return {
      path: SETTINGS.NOTIFICATIONS,
      keys: () => [SETTINGS.NOTIFICATIONS] as const
    };
  }
};
