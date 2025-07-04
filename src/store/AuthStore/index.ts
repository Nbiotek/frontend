import initializer from '@/utils/initializer';
import jwt from 'jsonwebtoken';
import store from 'store2';
import { RootStore } from '..';
import { action, flow, makeObservable, observable, runInAction } from 'mobx';
import { ISSERVER } from '@/utils';
import { Nullable } from 'vitest';
import logger from '@/utils/logger';
import { deleteSession, getSession, setSession } from '@/app/auth/action';
import { parseError } from '@/utils/errorHandler';
import ROUTES from '@/constants/routes';
import { TAuthLoginResponse, TCreateAccount, TForgotPwd, TLogin } from '@/app/auth/validation';
import {
  postRegister,
  postLogin,
  getNewAccessToken,
  postVerifyOTP,
  postNewPwd,
  postResendOTP,
  postForgotPwd
} from '@/requests/auth';
import { EnumRole } from '@/constants/mangle';
import toast from 'react-hot-toast';
import { Toast } from '@/atoms/Toast';

interface IJwtPayloadExt extends jwt.JwtPayload {
  authorization: boolean;
  /** in milisec */
  exp: number;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: boolean;
  profile_pics: string;
  uuid: string;
  role: string;
  isProfileCompleted: boolean;
}

export enum EnumResendToken {
  IDLE = 'IDLE',
  RESENDING = 'RESENDING',
  SENT = 'SENT',
  FAILED = 'FAILED'
}

const INIT_IS_LOADING = {
  logout: false,
  login: false,
  register: false,
  refresh: false,
  OTP: false,
  newPwd: false
};

export function decodeJWT(token: string) {
  return jwt.decode(token) as IJwtPayloadExt;
}

const persist = <T = string>(key: string, value: T) => {
  store.namespace('auth').local.set(key, value);
  return value;
};

const get = <T = string>(key: string, fallback?: T) => {
  return store.namespace('auth').local.get(key, fallback) as T;
};

const del = (key: string) => {
  return store.namespace('auth').local.remove(key);
};

type TIsAuthenticated = { ttl: number; token?: string; email?: string; role?: string };

class AuthStore {
  _pd = '';

  rootStore: RootStore;
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');
  accessToken = get('token');
  user = get<Partial<TProfileInfo>>('user', {});
  tokenExpiresAt = 0;
  otpTimer = 30;
  resendingToken: EnumResendToken = EnumResendToken.IDLE;
  decodedToken: Nullable<IJwtPayloadExt> = null;
  loggedOut = true;

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;

    makeObservable(this, {
      isLoading: observable,
      errors: observable,
      accessToken: observable,
      user: observable,
      tokenExpiresAt: observable,
      otpTimer: observable,
      resendingToken: observable,
      decodedToken: observable,
      loggedOut: observable,
      _pd: observable,

      removeFromStore: action.bound,
      reset: action.bound,
      clearError: action.bound,
      sessionCleanup: action.bound,
      resetStores: action.bound,
      setAccessToken: action.bound,
      setResendingToken: action.bound,
      isAuthenticated: action.bound,
      fetchNewToken: action.bound,

      grantAccess: flow.bound,
      getTokenFromCookie: flow.bound,
      logout: flow.bound,
      login: flow.bound,
      createAcct: flow.bound,
      verifyAcctOTP: flow.bound,
      resendAcctOTP: flow.bound,
      newPwd: flow.bound,
      forgotPwd: flow.bound
    });
  }

  removeFromStore(key: string) {
    del(key);
  }

  reset() {
    this.accessToken = '';
    this.isLoading = { ...INIT_IS_LOADING };
    this.errors = initializer(this.isLoading, '');
    del('user');
    this.user = {};
    del('token');
  }

  clearError(errorItem: keyof typeof this.errors, delay = 3000) {
    setTimeout(() => {
      runInAction(() => {
        this.errors[errorItem] = '';
      });
    }, delay);
  }

  sessionCleanup() {
    if (!ISSERVER) {
      sessionStorage.clear();
      localStorage.clear();
      store.clearAll();
    }
    this.accessToken = '';
    this.tokenExpiresAt = 0;
  }

  resetStores() {
    this.reset();
    this.rootStore.AppConfigStore.toggleModals();
    this.sessionCleanup();
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

    return {
      ttl: authenticatedTTL,
      token,
      email: this.decodedToken?.email,
      role: this.decodedToken?.role
    };
  }

  fetchNewToken() {
    this.isLoading.refresh = true;
    getNewAccessToken()
      .then((res) => {
        runInAction(() => {
          this.accessToken = res.data.data.access_token;
          this.isAuthenticated(res.data.data.access_token);
        });
      })
      .catch((error) => {
        this.errors.refresh = parseError(error);
      })
      .finally(() => {
        this.isLoading.refresh = false;
      });
  }

  *grantAccess(access_token: string, email_verified: boolean, cb?: (url: string) => void) {
    this.accessToken = persist('token', access_token);
    const decodedToken = decodeJWT(access_token);
    this.isAuthenticated(access_token);
    this.user = persist('user', {
      first_name: decodedToken.first_name,
      last_name: decodedToken.last_name,
      email: decodedToken.email,
      email_verified: decodedToken.email_verified,
      role: decodedToken.role,
      profile_pics: decodedToken.profile_pics,
      uuid: decodedToken.uuid,
      id: decodedToken.id,
      isProfileCompleted: decodedToken.isProfileCompleted
    });

    if (email_verified == false) {
      Toast.info('Check your inbox to verify your account.');
      this.isLoading.login = false;
      this.errors.login = '';
      cb && cb(ROUTES.OTP.path);
      return;
    }

    yield setSession({
      token: access_token,
      id: this.user.id ?? 0,
      email: this.user.email ?? '',
      role: this.user.role ?? '',
      uuid: this.user.uuid ?? ''
    });

    this._pd = '';

    if (this.user.email_verified) {
      if (this.user.role === EnumRole.PATIENT) {
        if (decodedToken.isProfileCompleted) {
          cb && cb(ROUTES.PATIENT.path);
        } else {
          this.rootStore.PatientStore.setPersonalInfoPersist({
            firstName: this.user.first_name,
            lastName: this.user.last_name,
            email: this.user.email
          });
          cb && cb(ROUTES.PATIENT_REG_INFO.path);
        }
      } else {
        cb && cb(ROUTES.getRedirectPathByRole(decodedToken.role as EnumRole));
      }
    }
  }

  *getTokenFromCookie() {
    try {
      const res = (yield getSession()) as SessionPayload;
      try {
        this.accessToken = persist('token', res.token);
        try {
          this.user = persist('user', {
            ...this.user,
            role: res.role,
            id: res.id,
            uuid: res.uuid
          });
          try {
            this.isAuthenticated(res.token);
            return res.token;
          } catch (e) {
            logger.error('Error in isAuthenticated', e);
          }
        } catch (e) {
          logger.error('Error persisting user', e);
        }
      } catch (e) {
        logger.error('Error persisting token', e);
      }
    } catch (error) {
      logger.error('Error getting session', error);
    }
  }

  *logout(cb?: () => void) {
    this.isLoading.login = true;
    try {
      this.sessionCleanup();
      yield deleteSession();
      this.resetStores();

      toast.success('You have been sucessfully logged out!');
      cb ? cb() : (window.location.href = ROUTES.LOGIN.path);
    } catch (error) {
      toast.error(parseError(error));
      this.errors.logout = parseError(error);
      setTimeout(() => {
        this.errors.logout = '';
      }, 5000);
    }
    this.isLoading.login = false;
  }

  *login(payload: TLogin, cb?: (url: string) => void) {
    this.isLoading.login = true;
    this.errors.login = '';

    try {
      const {
        data: { data }
      } = (yield postLogin(payload)) as { data: TAuthLoginResponse };

      if (!data) throw new Error('Login failed with 40201');
      this.grantAccess(data.access_token, data.email_verified, cb);
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.login = false;
    }
  }

  *createAcct(payload: TCreateAccount, cb?: () => void) {
    this.isLoading.register = true;
    this.errors.register = '';

    try {
      const {
        data: { data }
      } = (yield postRegister(payload)) as { data: TAuthLoginResponse };

      fetch('/api/access', {
        headers: {
          Authorization: `Bearer ${data?.access_token}`
        }
      });

      this.accessToken = persist('token', data?.access_token as string);
      this.isAuthenticated(data?.access_token);
      this._pd = payload.password;

      toast.success('Registration successful!');
      Toast.info('Verify your account now!');
      cb && cb();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.register = false;
    }
  }

  *verifyAcctOTP(otp: string, cb: (url: string) => void) {
    this.isLoading.OTP = true;
    this.errors.OTP = '';

    try {
      const payload: TVerifyOTPPayload = {
        otp
      };
      const {
        data: { data, message }
      } = (yield postVerifyOTP(payload)) as { data: TAuthLoginResponse };

      if (!data.email_verified) {
        toast.error('Unable to verify account!');
        return;
      } else {
        toast.success(message);
        this.grantAccess(data.access_token, data.email_verified, cb);
      }
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.OTP = false;
    }
  }

  *resendAcctOTP(cb: () => void) {
    this.isLoading.OTP = true;

    try {
      const {
        data: { message }
      } = (yield postResendOTP()) as { data: INBTServerResp<string> };

      toast.success(message);
      cb();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.OTP = false;
    }
  }

  *newPwd(payload: TNewPwdPayload, cb: () => void) {
    this.isLoading.newPwd = true;

    try {
      yield postNewPwd(payload);
      toast.success('New password set!');
      cb();
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.newPwd = false;
    }
  }

  *forgotPwd(payload: TForgotPwd) {
    this.isLoading.newPwd = true;

    try {
      yield postForgotPwd(payload);
      toast.success('Reset password link sent!');
    } catch (error) {
      toast.error(parseError(error));
    } finally {
      this.isLoading.newPwd = false;
    }
  }
}

export default AuthStore;
