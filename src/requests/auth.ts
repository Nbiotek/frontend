import {
  TAuthLoginResponse,
  TCreateAccount,
  TForgotPwd,
  TLogin,
  TPwdSchema
} from '@/app/auth/validation';
import server, { serverwithoutInterceptor } from '.';
import { AUTH } from '@/constants/api';

// post requests
export const postLogin = async (payload: TLogin) =>
  server.post<TAuthLoginResponse>(AUTH.LOGIN, payload);

export const postRegister = async (payload: TCreateAccount) =>
  server.post<TAuthLoginResponse>(AUTH.REGISTER, payload);

export const postForgotPwd = async (payload: TForgotPwd) =>
  server.post<INBTServerResp<string>>(AUTH.FORGOT_PWD, payload);

export const postNewPwd = async (payload: TNewPwdPayload) =>
  server.post<INBTServerResp<string>>(AUTH.NEW_PWD, payload);

export const postVerifyOTP = async (payload: TVerifyOTPPayload) =>
  server.post<INBTServerResp<{ access_token: string }>>(AUTH.OTP, payload);

export const postChangePwd = (payload: TPwdSchema) =>
  server.post<INBTServerResp<string>>(AUTH.CHANGE_PWD, payload);

// get requests
export const getProfile = async () => server.get<TGetProfile>(AUTH.GET_PROFILE);

export const getNewAccessToken = async () =>
  serverwithoutInterceptor.get<INBTServerResp<{ access_token: string }>>(AUTH.NEW_ACCESS_TOKEN);

export const getResendOTP = () => server.get<INBTServerResp<string>>(AUTH.RESEND_VERIFICATION_OTP);
