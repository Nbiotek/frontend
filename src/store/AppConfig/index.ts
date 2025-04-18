import { action, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import { AppModals, TAppModalsAction } from './appModalTypes';
import initializer from '@/utils/initializer';
import { EnumResultStatus } from '@/atoms/Buttons/Status';

const INIT_IS_OPEN = initializer(AppModals, false);

export class AppConfigStore {
  rootStore: RootStore;

  queryLimit: number = 10;

  isOpen = { ...INIT_IS_OPEN };
  nonce = 0;

  testDetails = {
    testId: ''
  };

  availableLabTechnicians: { testId: string; isReassign?: boolean } = {
    testId: ''
  };

  qcStatusUpdate = {
    testId: '',
    currentStatus: EnumResultStatus.PENDING
  };

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      isOpen: observable,
      nonce: observable,
      testDetails: observable,
      queryLimit: observable,
      availableLabTechnicians: observable,
      qcStatusUpdate: observable,

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
          this.testDetails = {
            testId: modal.testId
          };
        }
        break;
      case AppModals.AVAILABLE_TECHNICIANS:
        if (modal.open) {
          this.availableLabTechnicians = {
            testId: modal.testId,
            isReassign: Boolean(modal.isReassign)
          };
        }
        break;
      case AppModals.QC_STATUS_UPDATE:
        if (modal.open) {
          this.qcStatusUpdate = {
            testId: modal.testId,
            currentStatus: modal.currentStatus
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
