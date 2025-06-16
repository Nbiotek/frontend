import { XModal } from '.';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';
import FileInput from '@/atoms/fields/FileInput';
import { mediaAcceptTypes } from '@/constants';
import { AppModals } from '@/store/AppConfig/appModalTypes';

const MediaUploadModal = () => {
  const {
    AppConfigStore: { toggleModals, isOpen, fileModalUpload }
  } = useStore();

  return (
    <XModal
      isOpen={isOpen.FILE_UPLOAD_MODAL}
      closeModal={() => toggleModals({ name: AppModals.FILE_UPLOAD_MODAL, open: false })}
      bgClose={false}
      title="Upload files"
      className="!max-w-[1200px]"
    >
      <div className="h-[500px] w-full overflow-y-scroll">
        <FileInput
          multiple
          handlerFn={fileModalUpload.handlerFn}
          name="files"
          accept={mediaAcceptTypes}
        />
      </div>
    </XModal>
  );
};

export default observer(MediaUploadModal);
