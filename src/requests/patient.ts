import {
  TPatientContactSChema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import server from '.';
import { PATIENT } from '@/constants/api';

// post
export const postPatientPersonal = (payload: TPatientPersonalSchema) =>
  server.post(PATIENT.PERSONAL, payload);

export const postPatientContact = (payload: TPatientContactSChema) =>
  server.post(PATIENT.CONTACT, payload);

export const postPatientInsurance = (payload: TPatientInsuranceSchema) =>
  server.post(PATIENT.INSURANCE, payload);
