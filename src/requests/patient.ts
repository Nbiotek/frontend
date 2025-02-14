import {
  TPatientContactSchema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import server from '.';
import { PATIENT } from '@/constants/api';

export type TPatientRegPayload = {
  personal: TPatientPersonalSchema;
  contact: TPatientContactSchema;
  insurance: TPatientInsuranceSchema;
};

// post
export const postRegPatient = (payload: TPatientRegPayload) =>
  server.post(PATIENT.PERSONAL_REG, payload);
