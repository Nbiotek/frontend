import { XModal } from '@/atoms/modal';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfigStore/appModalTypes';
import { observer } from 'mobx-react-lite';
import React from 'react';

const ResultUploadModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals }
  } = useStore();
  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.RESULT_UPLOAD_MODAL, open: false })}
      bgClose={false}
      isOpen={isOpen.RESULT_UPLOAD_MODAL}
    >
      <div>result upload</div>
    </XModal>
  );
};

export default observer(ResultUploadModal);
