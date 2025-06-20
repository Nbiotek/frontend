import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Stores } from '@/store';
import ROUTES from '@/constants/routes';
import { ISSERVER } from '@/utils';
import { env } from '@/env';

const NO_REDIRECT_ROUTES = [ROUTES.LOGIN.path] as string[];

const EXIT_HTTP_CODE = 401;

const resourceReqInterceptor = (config: InternalAxiosRequestConfig) => {
  const modifiedConfig = { ...config };
  const { ttl, token } = Stores.AuthStore.isAuthenticated();
  const treshold = 5 * 60 * 1000;
  let _token = token;
  if (!_token) {
    _token = Stores.AuthStore.getTokenFromCookie() as unknown as string;
  }

  if (Stores.AuthStore.isLoading.refresh === false && ttl < treshold && ttl > 0) {
    Stores.AuthStore.fetchNewToken();
  }

  if (_token && modifiedConfig.headers) modifiedConfig.headers.Authorization = `Bearer ${_token}`;

  return modifiedConfig;
};

const resourceResInterceptor = (response: AxiosResponse) => response;

const resourceResErrorInterceptor = (error: AxiosError) => {
  const status = error.response?.status;

  if (
    !ISSERVER &&
    !NO_REDIRECT_ROUTES.some((p) => window.location.pathname.includes(p)) &&
    status === EXIT_HTTP_CODE
  ) {
    localStorage.setItem('fromPath', window.location.pathname);
    Stores.AuthStore.logout();
    return Promise.reject(new Error('Unauthorized'));
  }

  if (status && status >= 200 && status < 300) {
    console.warn('Response intercepted as error but has 2xx status:', error.response);
    return Promise.resolve(error.response);
  }

  return Promise.reject(error);
};

const server = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
});

export const serverwithoutInterceptor = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
});

export const uninterceptedServer = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
});

export default server;

server.interceptors.request.use(resourceReqInterceptor);

server.interceptors.response.use(resourceResInterceptor, resourceResErrorInterceptor);
