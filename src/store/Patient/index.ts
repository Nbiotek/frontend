import { action, flow, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import {
  TPatientContactSchema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import store from 'store2';
import initializer from '@/utils/initializer';
import { EnumPatientForm, Mangle } from '@/constants/mangle';
import { parseError } from '@/utils/errorHandler';
import { Toast } from '@/atoms/Toast';
import { postRegPatient, TPatientRegPayload } from '@/requests/patient';

const persist = <T = string>(key: string, value: T) => {
  store.namespace('pat').session.set(key, value);
  return value;
};

const get = <T = string>(key: string, fallback?: T) => {
  return store.namespace('pat').session.get(key, fallback) as T;
};

const del = (key: string) => {
  return store.namespace('pat').session.remove(key);
};

const INIT_IS_LOADING = {
  regPatient: false
};

export class PatientStore {
  rootStore: RootStore;
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');
  currentForm = get<EnumPatientForm>(Mangle.PATIENT_CURRENT_FORM, EnumPatientForm.PEROSNAL);
  personalInfo = get<Partial<TPatientPersonalSchema>>(Mangle.PATIENT_PERSONAL_INFO, {});
  contactInfo = get<Partial<TPatientContactSchema>>(Mangle.PATIENT_CONTACT_INFO, {});
  insuranceInfo = get<Partial<TPatientInsuranceSchema>>(Mangle.PATIENT_INSURANCE_INFO, {});

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      rootStore: observable,
      isLoading: observable,
      errors: observable,
      currentForm: observable,
      personalInfo: observable,
      contactInfo: observable,
      insuranceInfo: observable,

      resetPatientStore: action.bound,
      setCurrentForm: action.bound,
      setPersonalInfo: action.bound,
      setContactInfo: action.bound,
      setInsuranceInfo: action.bound,

      registerPatient: flow.bound
    });
    this.rootStore = _rootStore;
  }

  resetPatientStore() {
    del(Mangle.PATIENT_PERSONAL_INFO);
    del(Mangle.PATIENT_CONTACT_INFO);
    del(Mangle.PATIENT_INSURANCE_INFO);
  }

  setCurrentForm(_form: EnumPatientForm) {
    this.currentForm = _form;
    persist(Mangle.PATIENT_CURRENT_FORM, _form);
  }

  setPersonalInfo(payload: TPatientPersonalSchema) {
    this.personalInfo = payload;
    this.currentForm = EnumPatientForm.CONTACT;
    persist(Mangle.PATIENT_PERSONAL_INFO, payload);
    this.setCurrentForm(EnumPatientForm.CONTACT);
  }

  setContactInfo(payload: TPatientContactSchema) {
    this.contactInfo = payload;
    this.currentForm = EnumPatientForm.INSURANCE;
    persist(Mangle.PATIENT_CONTACT_INFO, payload);
    this.setCurrentForm(EnumPatientForm.INSURANCE);
  }

  setInsuranceInfo(payload: TPatientInsuranceSchema, cb: () => void) {
    this.insuranceInfo = payload;
    persist(Mangle.PATIENT_INSURANCE_INFO, payload);
    persist(Mangle.PATIENT_CURRENT_FORM, EnumPatientForm.INSURANCE);
  }

  *registerPatient() {
    this.isLoading.regPatient = true;
    try {
      const payload: TPatientRegPayload = {
        personal: this.personalInfo as TPatientPersonalSchema,
        contact: this.contactInfo as TPatientContactSchema,
        insurance: this.insuranceInfo as TPatientInsuranceSchema
      };
      const { data } = yield postRegPatient(payload);
    } catch (error) {
      Toast.error(parseError(error));
    } finally {
      this.isLoading.regPatient = false;
    }
  }
}
