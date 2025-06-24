import { action, flow, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import initializer from '@/utils/initializer';
import { TProfileSettingsSchema } from '@/components/common/settings/validation';
import { putProfileSettings } from '@/requests/settings';
import toast from 'react-hot-toast';

const INIT_IS_LOADING = {
  updateProfile: false
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

      updateProfile: flow.bound
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
}

export default SettingsStore;
