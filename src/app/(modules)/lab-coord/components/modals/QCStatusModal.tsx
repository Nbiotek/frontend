import { XModal } from '@/atoms/modal';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import { useUpdateQCStatus } from '@/hooks/labCoord/useUpdateQCStatus';
import { Paragraph } from '@/atoms/typographys';
import Button from '@/atoms/Buttons';
import { EnumResultStatus } from '@/atoms/Buttons/Status';
import { useState } from 'react';

const QCStatusModal = () => {
  const {
    AppConfigStore: { isOpen, toggleModals, qcStatusUpdate }
  } = useStore();

  const { mutate, isPending } = useUpdateQCStatus(() => toggleModals({}));
  const [status, setStatus] = useState('');

  const handleUpdate = (status: EnumResultStatus) => {
    setStatus(status);
    mutate({ id: qcStatusUpdate.testId, payload: { status: status } });
  };

  return (
    <XModal
      closeModal={() => toggleModals({ name: AppModals.QC_STATUS_UPDATE, open: false })}
      bgClose={false}
      isOpen={isOpen.QC_STATUS_UPDATE}
      className="!max-w-[450px]"
      title="Update QC Status"
    >
      <div className="flex w-full flex-col space-y-8 bg-white">
        <Paragraph text="You are about to update the Quality control status of a test." />

        <div className="flex items-center justify-end space-x-3">
          <Button
            className="!w-24"
            disabled={isPending}
            isLoading={isPending && status === EnumResultStatus.FAILED}
            variant="danger"
            text="Fail"
            onClick={() => handleUpdate(EnumResultStatus.FAILED)}
          />
          <Button
            className="!w-24"
            disabled={isPending}
            isLoading={isPending && status === EnumResultStatus.PASSED}
            variant="filled"
            text="Pass"
            onClick={() => handleUpdate(EnumResultStatus.PASSED)}
          />
        </div>
      </div>
    </XModal>
  );
};

export default observer(QCStatusModal);
