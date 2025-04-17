export enum AppModals {
  RESULT_UPLOAD_MODAL = 'RESULT_UPLOAD_MODAL',
  LOG_OUT_MODAL = 'LOG_OUT_MODAL',
  AVAILABLE_TECHNICIANS = 'AVAILABLE_TECHNICIANS',
  ADD_INVENTORY = 'ADD_INVENTORY'
}

export type TAppModalsAction =
  | { name?: undefined }
  | {
      name: '';
      open?: boolean;
    }
  | ({ name: AppModals.LOG_OUT_MODAL | AppModals.ADD_INVENTORY } & {
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
    ));
