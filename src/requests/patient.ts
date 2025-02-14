import {
  TPatientContactSchema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import server from '.';
import { PATIENT } from '@/constants/api';
import { toJS } from 'mobx';

export type TPatientRegPayload = {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    maritalStatus: string;
    gender: string;
    dateOfBirth: string;
    weight?: string | number;
    height?: string | number;
    primaryCarePhysician?: string | undefined;
  };
  contact: TPatientContactSchema;
  insurance: TPatientInsuranceSchema;
};

// post
export const postRegPatient = (payload: TPatientRegPayload) => {
  const { personal } = payload;

  if (personal.height) {
    personal.height = Number(personal.height);
  } else {
    personal.height = 0;
  }

  if (personal.weight) {
    personal.weight = Number(personal.weight);
  } else {
    personal.weight = 0;
  }
  return server.post<INBTServerResp<{ access_token: string }>>(PATIENT.PERSONAL_REG, payload);
};
