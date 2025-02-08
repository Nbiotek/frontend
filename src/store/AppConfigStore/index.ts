import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import { AppModals, TAppModalsAction } from './appModalTypes';
import initializer from '@/utils/initializer';

const INIT_IS_OPEN = initializer(AppModals, false);

export class AppConfigStore {
  rootStore: RootStore;

  isOpen = { ...INIT_IS_OPEN };
  nonce = 0;

  resultUpload = {
    test_uid: ''
  };

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      isOpen: observable,
      nonce: observable,
      resultUpload: observable,

      setModalOpenState: action.bound,
      toggleModals: action.bound
    });
    this.rootStore = _rootStore;
  }

  setModalOpenState(name: AppModals, open?: boolean) {
    this.isOpen[name] = typeof open === 'undefined' ? !this.isOpen[name] : open;
  }

  toggleModals(modal: TAppModalsAction = {}) {
    switch (modal.name) {
      case '':
        break;

      case AppModals.RESULT_UPLOAD_MODAL:
        if (modal.open) {
          this.resultUpload = {
            test_uid: modal.test_uuid
          };
        }
        break;
      default:
        this.isOpen = { ...INIT_IS_OPEN };
        break;
    }
    if (modal.name && AppModals[modal.name] !== undefined) {
      this.setModalOpenState(modal.name, modal.open);
    }

    this.nonce = Date.now() + Math.random();
  }
}
