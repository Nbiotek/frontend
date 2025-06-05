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
  ADMIN_SINGLE_TEST = 'ADMIN_SINGLE_TEST'
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
  | ({ name: AppModals.RESULT_UPLOAD_MODAL | AppModals.ADMIN_SINGLE_TEST } & (
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
  | ({ name: AppModals.SINGLE_APPOINTMENT | AppModals.UPDATE_APPOINTMENT } & (
      | {
          open: true;
          id: string;
        }
      | { open?: false }
    ));
