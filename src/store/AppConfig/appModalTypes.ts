import { EnumResultStatus } from '@/atoms/Buttons/Status';

export enum AppModals {
  RESULT_UPLOAD_MODAL = 'RESULT_UPLOAD_MODAL',
  LOG_OUT_MODAL = 'LOG_OUT_MODAL',
  AVAILABLE_TECHNICIANS = 'AVAILABLE_TECHNICIANS',
  ADD_INVENTORY = 'ADD_INVENTORY',
  QC_STATUS_UPDATE = 'QC_STATUS_UPDATE',
  RECPTS_PATIENT_REG = 'RECPTS_PATIENT_REG',
  AVAILABLE_MARKETERS = 'AVAILABLE_MARKETERS',
  SINGLE_APPOINTMENT = 'SINGLE_APPOINTMENT',
  UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT',
  ADMIN_ADD_USER = 'ADMIN_ADD_USER',
  ADMIN_SINGLE_TEST = 'ADMIN_SINGLE_TEST',
  ADMIN_PACKAGE_TEST = 'ADMIN_PACKAGE_TEST',
  ADMIN_DELETE_USER = 'ADMIN_DELETE_USER',
  ADMIN_SUSPEND_USER = 'ADMIN_SUSPEND_USER',
  ADMIN_UNSUSPEND_USER = 'ADMIN_UNSUSPEND_USER',
  ADMIN_TOGGLE_TEST_AVAILABILITY = 'ADMIN_TOGGLE_TEST_AVAILABILITY',
  FILE_UPLOAD_MODAL = 'FILE_UPLOAD_MODAL',
  CREATE_HERO_SECTION_MODAL = 'CREATE_HERO_SECTION_MODAL',
  CREATE_HERO_CAROUSEL_MODAL = 'CREATE_HERO_CAROUSEL_MODAL'
}

export type TAppModalsAction =
  | { name?: undefined }
  | {
      name: '';
      open?: boolean;
    }
  | ({
      name:
        | AppModals.LOG_OUT_MODAL
        | AppModals.ADD_INVENTORY
        | AppModals.RECPTS_PATIENT_REG
        | AppModals.ADMIN_ADD_USER;
    } & {
      open: boolean;
    })
  | ({
      name:
        | AppModals.RESULT_UPLOAD_MODAL
        | AppModals.ADMIN_SINGLE_TEST
        | AppModals.ADMIN_PACKAGE_TEST;
    } & (
      | {
          open: true;
          testId: string;
        }
      | { open?: false }
    ))
  | ({ name: AppModals.AVAILABLE_TECHNICIANS } & (
      | {
          open: true;
          testId: string;
          isReassign?: boolean;
        }
      | { open?: false }
    ))
  | ({ name: AppModals.QC_STATUS_UPDATE } & (
      | {
          open: true;
          testId: string;
          currentStatus: EnumResultStatus;
        }
      | { open?: false }
    ))
  | ({ name: AppModals.AVAILABLE_MARKETERS } & (
      | {
          open: true;
          testId: string;
          isReassign?: boolean;
        }
      | { open?: false }
    ))
  | ({
      name:
        | AppModals.SINGLE_APPOINTMENT
        | AppModals.UPDATE_APPOINTMENT
        | AppModals.ADMIN_DELETE_USER
        | AppModals.ADMIN_SUSPEND_USER
        | AppModals.ADMIN_UNSUSPEND_USER;
    } & (
      | {
          open: true;
          id: string;
        }
      | { open?: false }
    ))
  | ({
      name: AppModals.ADMIN_TOGGLE_TEST_AVAILABILITY;
    } & (
      | {
          open: true;
          id: string;
          status: string;
          type: string;
        }
      | { open?: false }
    ))
  | ({ name: AppModals.FILE_UPLOAD_MODAL } & (
      | { open: true; handlerFn: (files: File[]) => void }
      | { open?: false }
    ))
  | ({ name: AppModals.CREATE_HERO_SECTION_MODAL | AppModals.CREATE_HERO_CAROUSEL_MODAL } & (
      | { open: true; id: string }
      | { open?: false }
    ));
