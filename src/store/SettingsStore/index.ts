import { action, flow, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import initializer from '@/utils/initializer';
import { TProfileSettingsSchema } from '@/components/common/settings/validation';
import {
  postPwdSettings,
  putProfileSettings,
  putRecoveryContactSettings
} from '@/requests/settings';
import toast from 'react-hot-toast';
import {
  TRecoveryEmailSchema,
  TRecoveryPhoneSchema,
  TUpdatePwdSchema
} from '@/components/common/settings/validations';

const INIT_IS_LOADING = {
  updateProfile: false,
  updatePwd: false,
  updateRecoveryMail: false,
  updateRecoveryNumber: false
};

class SettingsStore {
  rootStore: RootStore;
  isSettingsLoading = { ...INIT_IS_LOADING };
  errors = initializer(this.isSettingsLoading, '');

  constructor(_rootStore: RootStore) {
    this.rootStore = _rootStore;
    makeObservable(this, {
      isSettingsLoading: observable,
      errors: observable,

      updateProfile: flow.bound,
      updatePassword: flow.bound,
      updateRecoveryMail: flow.bound,
      updateRecoveryNumber: flow.bound
    });
  }

  *updateProfile(payload: Partial<TProfileSettingsSchema>, cb: () => void) {
    this.isSettingsLoading.updateProfile = true;
    this.errors.updateProfile = '';
    try {
      yield putProfileSettings(payload);
      toast.success('Profile updated!');
      this.isSettingsLoading.updateProfile = false;
      cb();
    } catch (error) {
      toast.error('Unable to update profile.');
    } finally {
      this.isSettingsLoading.updateProfile = false;
    }
  }

  *updatePassword(payload: TUpdatePwdSchema) {
    this.isSettingsLoading.updatePwd = true;
    this.errors.updatePwd = '';
    try {
      const res = (yield postPwdSettings(payload)) as INBTServerResp<{}>;
      if (res.statusCode === 201) {
        toast.success('Password updated!');
        this.isSettingsLoading.updatePwd = false;
        this.rootStore.AuthStore.logout();
      } else {
        toast.error('Unable to update password.');
      }
    } catch (error) {
      toast.error('Unable to update password.');
    } finally {
      this.isSettingsLoading.updatePwd = false;
    }
  }

  *updateRecoveryMail(payload: TRecoveryEmailSchema, cb: () => void) {
    this.isSettingsLoading.updateRecoveryMail = true;
    this.errors.updateRecoveryMail = '';
    try {
      const res = (yield putRecoveryContactSettings(
        payload
      )) as INBTServerResp<TRecoveryContactSettings>;

      toast.success('Recovery contact updated!');
      this.isSettingsLoading.updateRecoveryMail = false;
      cb();
    } catch (error) {
      toast.error('Unable to add recovery contact.');
    } finally {
      this.isSettingsLoading.updateRecoveryMail = false;
    }
  }

  *updateRecoveryNumber(payload: TRecoveryPhoneSchema, cb: () => void) {
    this.isSettingsLoading.updateRecoveryNumber = true;
    this.errors.updateRecoveryNumber = '';
    try {
      const res = (yield putRecoveryContactSettings(
        payload
      )) as INBTServerResp<TRecoveryContactSettings>;

      toast.success('Recovery contact updated!');
      this.isSettingsLoading.updateRecoveryNumber = false;
      cb();
    } catch (error) {
      toast.error('Unable to add recovery contact.');
    } finally {
      this.isSettingsLoading.updateRecoveryNumber = false;
    }
  }
}

export default SettingsStore;
