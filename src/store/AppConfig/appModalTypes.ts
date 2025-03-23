export enum AppModals {
  RESULT_UPLOAD_MODAL = 'RESULT_UPLOAD_MODAL',
  LOG_OUT_MODAL = 'LOG_OUT_MODAL',
  AVAILABLE_TECHNICIANS = 'AVAILABLE_TECHNICIANS'
}

export type TAppModalsAction =
  | { name?: undefined }
  | {
      name: '';
      open?: boolean;
    }
  | ({ name: AppModals.LOG_OUT_MODAL } & {
      open: boolean;
    })
  | ({ name: AppModals.RESULT_UPLOAD_MODAL | AppModals.AVAILABLE_TECHNICIANS } & (
      | {
          open: true;
          testId: string;
        }
      | { open?: false }
    ));
