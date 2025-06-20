import { action, makeObservable, observable, toJS } from 'mobx';
import { RootStore } from '..';
import { AppModals, TAppModalsAction } from './appModalTypes';
import initializer from '@/utils/initializer';
import { EnumResultStatus } from '@/atoms/Buttons/Status';

const INIT_IS_OPEN = initializer(AppModals, false);

class AppConfigStore {
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

  availableMarketers: { testId: string; isReassign?: boolean } = {
    testId: ''
  };

  qcStatusUpdate = {
    testId: '',
    currentStatus: EnumResultStatus.PENDING
  };

  singleAppt = {
    id: ''
  };

  data = {
    id: ''
  };

  testAvailability = {
    id: '',
    status: '',
    type: ''
  };

  fileModalUpload = {
    handlerFn: (files: File[]) => {}
  };

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      isOpen: observable,
      nonce: observable,
      testDetails: observable,
      queryLimit: observable,
      availableLabTechnicians: observable,
      availableMarketers: observable,
      qcStatusUpdate: observable,
      data: observable,
      testAvailability: observable,
      fileModalUpload: observable,

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
      case AppModals.AVAILABLE_MARKETERS:
        if (modal.open) {
          this.availableMarketers = {
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
      case AppModals.SINGLE_APPOINTMENT:
        if (modal.open) {
          this.singleAppt = {
            id: modal.id
          };
        }
        break;
      case AppModals.UPDATE_APPOINTMENT:
        if (modal.open) {
          this.singleAppt = {
            id: modal.id
          };
        }
        break;
      case AppModals.ADMIN_SINGLE_TEST:
        if (modal.open) {
          this.testDetails = {
            testId: modal.testId
          };
        }
        break;
      case AppModals.ADMIN_PACKAGE_TEST:
        if (modal.open) {
          this.testDetails = {
            testId: modal.testId
          };
        }
        break;
      case AppModals.ADMIN_DELETE_USER:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;
      case AppModals.ADMIN_SUSPEND_USER:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;
      case AppModals.ADMIN_UNSUSPEND_USER:
        if (modal.open) {
          this.data = {
            id: modal.id
          };
        }
        break;
      case AppModals.ADMIN_TOGGLE_TEST_AVAILABILITY:
        if (modal.open) {
          this.testAvailability = {
            id: modal.id,
            status: modal.status,
            type: modal.type
          };
        }
        break;
      case AppModals.FILE_UPLOAD_MODAL:
        if (modal.open) {
          this.fileModalUpload = {
            handlerFn: modal.handlerFn
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

export default AppConfigStore;
