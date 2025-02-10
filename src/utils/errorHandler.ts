import { ZodError } from 'zod';
import logger from './logger';
import { AxiosError } from 'axios';

export const isAxiosError = (error: any): error is AxiosError<Partial<INBTApiError>> => {
  return error.isAxiosError === true;
};

export const isZodError = <T>(error: unknown): error is ZodError<T> => {
  return error instanceof ZodError;
};

export const isGenericError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export function parseError<T>(error: unknown): string {
  if (!error) return '__empty__';

  if (isAxiosError(error)) {
    if (error.name === 'CanceledError') return 'Request canceled';
    if (error.response?.status === 400) return error.response?.data.message || 'Bad request';
    return error.response?.data?.message || 'Something went wrong. Try again later.';
  }
  if (isZodError<T>(error)) {
    return handleZodError(error);
  }
  if (isGenericError(error)) {
    return error.message;
  }
  return 'Something went wrong. Try again later.';
}

function handleZodError(error: ZodError): string {
  const errorMessages = error.errors.map((e) => `${e.path.join('.')} - ${e.message}`);
  logger.debug('Error messages:', errorMessages);
  return errorMessages.join(', ');
}
