import { EnumResultStatus } from '@/atoms/Buttons/Status';

export enum AppModals {
  RESULT_UPLOAD_MODAL = 'RESULT_UPLOAD_MODAL',
  LOG_OUT_MODAL = 'LOG_OUT_MODAL',
  AVAILABLE_TECHNICIANS = 'AVAILABLE_TECHNICIANS',
  ADD_INVENTORY = 'ADD_INVENTORY',
  QC_STATUS_UPDATE = 'QC_STATUS_UPDATE',
  RECPTS_PATIENT_REG = 'RECPTS_PATIENT_REG'
}

export type TAppModalsAction =
  | { name?: undefined }
  | {
      name: '';
      open?: boolean;
    }
  | ({ name: AppModals.LOG_OUT_MODAL | AppModals.ADD_INVENTORY | AppModals.RECPTS_PATIENT_REG } & {
      open: boolean;
    })
  | ({ name: AppModals.RESULT_UPLOAD_MODAL } & (
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
    ));
