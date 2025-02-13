import { flow, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import {
  TPatientContactSChema,
  TPatientInsuranceSchema,
  TPatientPersonalSchema
} from '@/app/auth/validation';
import store from 'store2';
import initializer from '@/utils/initializer';

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
  create: false
};

export class PatientStore {
  rootStore: RootStore;
  isLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isLoading, '');

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      rootStore: observable,
      isLoading: observable,
      errors: observable,

      personalInfo: flow.bound,
      contactInfo: flow.bound,
      insuranceInfo: flow.bound
    });
    this.rootStore = _rootStore;
  }

  *personalInfo(payload: TPatientPersonalSchema, cb: () => void) {
    try {
    } catch (error) {
    } finally {
    }
  }

  *contactInfo(payload: TPatientContactSChema, cb: () => void) {}

  *insuranceInfo(payload: TPatientInsuranceSchema, cb: () => void) {}
}
