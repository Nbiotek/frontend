import { Text } from '@/lib/utils/Text';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import Button from '@/atoms/Buttons';
import FilePreview from '@/components/common/FileUpload/FilePreview';
import { Upload } from 'lucide-react';

interface PhotoUploadProps {
  mediaFields: { id: string; file: File | TRemoteFile }[];
  onUpdate: (index: number, remoteFile: TRemoteFile) => void;
  onRemove: (index: number, media_uuid?: string) => void;
  onPhotoUpload: (files: File[]) => void;
  fieldVisitData: FieldTaskData | undefined;
}

const PhotoUploadSection = ({
  mediaFields,
  onUpdate,
  onRemove,
  onPhotoUpload,
  fieldVisitData
}: PhotoUploadProps) => {
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const hasExistingSamples = fieldVisitData?.samplePhotos && fieldVisitData.samplePhotos.length > 0;

  // Function to open the file upload modal
  const handleOpenFileUpload = () => {
    toggleModals({
      open: true,
      name: AppModals.FILE_UPLOAD_MODAL,
      handlerFn: onPhotoUpload
    });
  };

  return (
    <div className="mt-6 pt-2">
      <div className="mb-4 flex items-center justify-between">
        <Text variant="subtitle" weight="medium">
          {hasExistingSamples ? 'Sample Photos' : 'Upload Sample Photos'}
        </Text>

        {!hasExistingSamples && (
          <div className="mt-4 w-fit">
            <Button
              variant="filled"
              type="button"
              text="Upload"
              className="!h-[35px] !w-auto !text-xs"
              leftIcon={<Upload size={15} />}
              onClick={handleOpenFileUpload}
            />
          </div>
        )}
      </div>

      {!hasExistingSamples && (
        <div className="flex flex-col">
          <div className="mt-4 flex w-full flex-wrap justify-start gap-5">
            {mediaFields.map(({ id, file }, idx) => (
              <FilePreview
                key={id}
                {...{ file, id, idx, bucket: 'cloudinary' }}
                remove={onRemove}
                update={onUpdate}
              />
            ))}
          </div>
        </div>
      )}

      {hasExistingSamples && (
        <div className="mt-6">
          <Text variant="subtitle" weight="medium" className="mb-2">
            Uploaded Photos ({fieldVisitData.samplePhotos.length})
          </Text>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {fieldVisitData.samplePhotos.map((photo: any, index: number) => (
              <div key={photo.id || index} className="group relative">
                <div className="border-gray-200 aspect-square overflow-hidden rounded-lg border shadow-sm">
                  <img
                    src={photo.url}
                    alt={`Sample ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-gray-500 mt-1 truncate text-xs">
                  {photo.file_name || `Sample ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadSection;
