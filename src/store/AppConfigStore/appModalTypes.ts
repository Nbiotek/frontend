export enum AppModals {
  RESULT_UPLOAD_MODAL = 'RESULT_UPLOAD_MODAL',
  LOG_OUT_MODAL = 'LOG_OUT_MODAL'
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
  | ({ name: AppModals.RESULT_UPLOAD_MODAL } & (
      | {
          open: true;
          test_uuid: string;
        }
      | { open?: false }
    ));
