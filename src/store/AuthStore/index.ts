import initializer from '@/utils/initializer';
import jwt from 'jsonwebtoken';
import store from 'store2';
import { RootStore } from '..';
import { action, flow, makeObservable, observable, runInAction } from 'mobx';
import { ISSERVER } from '@/utils';
import { Nullable } from 'vitest';
import logger from '@/utils/logger';
import { deleteSession, getSession, setSession } from '@/app/auth/action';

interface IJwtPayloadExt extends jwt.JwtPayload {
  authorization: boolean;
  /** in milisec */
  exp: number;
  userID: number;
  email: string;
  firstName: string;
  lastName: string;
  pics: string;
  user_uuid: string;
}

enum EnumResendToken {
  IDLE = 'IDLE',
  RESENDING = 'RESENDING',
  SENT = 'SENT',
  FAILED = 'FAILED'
}

const INIT_IS_LOADING = {
  login: false,
  refresh: false
};

export function decodeJWT(token: string) {
  return jwt.decode(token) as IJwtPayloadExt;
}

const persist = <T = string>(key: string, value: T) => {
  store.namespace('auth').session.set(key, value);
  return value;
};

const get = <T = string>(key: string, fallback?: T) => {
  return store.namespace('auth').session.get(key, fallback) as T;
};

const del = (key: string) => {
  return store.namespace('auth').session.remove(key);
};

type TIsAuthenticated = { ttl: number; token?: string; email?: string };

export class AuthStore {
  rootStore: RootStore;
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');
  accessToken = get('token');
  user = get<Partial<TProfileInfo>>('user', {});
  tokenExpiresAt = 0;
  resendingToken: EnumResendToken = EnumResendToken.IDLE;
  decodedToken: Nullable<IJwtPayloadExt> = null;
  loggedOut = true;

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      rootStore: observable,
      isLoading: observable,
      errors: observable,
      accessToken: observable,
      user: observable,
      tokenExpiresAt: observable,
      resendingToken: observable,
      decodedToken: observable,
      loggedOut: observable,

      removeFromStore: action.bound,
      reset: action.bound,
      clearError: action.bound,
      sessionCleanup: action.bound,
      resetStores: action.bound,
      setAccessToken: action.bound,
      setResendingToken: action.bound,
      isAuthenticated: action.bound,

      getTokenFromCookie: flow.bound,
      logout: flow.bound,
      login: flow.bound,
      register: flow.bound,
      verifyAcctOTP: flow.bound
    });
  }

  removeFromStore(key: string) {
    del(key);
  }

  reset() {
    this.accessToken = '';
    this.isLoading = { ...INIT_IS_LOADING };
    this.errors = initializer(this.isLoading, '');
  }

  clearError(errorItem: keyof typeof this.errors, delay = 3000) {
    setTimeout(() => {
      runInAction(() => {
        this.errors[errorItem] = '';
      });
    }, delay);
  }

  sessionCleanup() {
    if (!ISSERVER) sessionStorage.clear();
    this.accessToken = '';
    this.tokenExpiresAt = 0;
  }

  resetStores() {
    this.reset();
    this.rootStore.AppConfigStore.toggleModals();
  }

  setAccessToken(_token: string) {
    this.accessToken = _token;
  }

  setResendingToken(_resendingToken: EnumResendToken) {
    this.resendingToken = _resendingToken;
  }

  isAuthenticated(_token: string = this.accessToken): TIsAuthenticated {
    const token = _token || !ISSERVER ? get('token') : null;
    if (!token) {
      this.sessionCleanup();
      return { ttl: 0 };
    }
    this.decodedToken = decodeJWT(token);
    const tokenExpires = (this.decodedToken?.exp || 0) * 1000 || this.tokenExpiresAt;
    const authenticatedTTL = tokenExpires - new Date().valueOf();
    if (authenticatedTTL < 0) {
      this.sessionCleanup();
      return { ttl: 0 };
    }
    this.accessToken = token;
    this.tokenExpiresAt = tokenExpires;
    this.loggedOut = false;

    return { ttl: authenticatedTTL, token, email: this.decodedToken?.email };
  }

  fetchNewToken() {}

  *getTokenFromCookie() {
    try {
      const res = (yield getSession()) as SessionPayload;
      this.accessToken = persist('token', res.token);
      this.user = persist('user', {
        ...this.user,
        email: res.email,
        role: res.role,
        id: res.id,
        uuid: res.uuid
      });
      this.isAuthenticated(res.token);
      return res.token;
    } catch (error) {
      logger.error('Error getting token from cookie', error);
    }
  }

  *logout() {}

  *login() {}

  *register() {}

  *verifyAcctOTP() {}
}
