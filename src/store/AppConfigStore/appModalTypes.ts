export enum AppModals {
  RESULT_UPLOAD_MODAL = 'RESULT_UPLOAD_MODAL'
}

export type TAppModalsAction =
  | { name?: undefined }
  | {
      name: '';
      open?: boolean;
    }
  | ({ name: AppModals.RESULT_UPLOAD_MODAL } & (
      | {
          open: true;
          test_uuid: string;
        }
      | { open?: false }
    ));
