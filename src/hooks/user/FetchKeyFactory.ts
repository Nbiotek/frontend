import { AUTH } from '@/constants/api';

export const user = {
  getProfile() {
    return {
      path: AUTH.GET_PROFILE,
      keys: () => [AUTH.GET_PROFILE] as const
    };
  }
};
