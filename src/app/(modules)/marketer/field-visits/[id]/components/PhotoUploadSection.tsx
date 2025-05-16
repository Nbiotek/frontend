import { Text } from '@/lib/utils/Text';
import { ChangeEvent, useState } from 'react';

interface PhotoUploadProps {
  photoPreviewUrls: string[];
  onRemovePhoto: (index: number) => void;
  onPhotoUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  fieldVisitData: FieldTaskData | undefined;
}

const PhotoUploadSection = ({
  photoPreviewUrls,
  onRemovePhoto,
  onPhotoUpload,
  fieldVisitData
}: PhotoUploadProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index);
  };

  const closePhotoView = () => {
    setSelectedPhoto(null);
  };

  const hasExistingSamples = fieldVisitData?.samplePhotos && fieldVisitData.samplePhotos.length > 0;

  return (
    <>
      {!hasExistingSamples ? (
        <div className="mt-6 pt-2">
          <Text variant="subtitle" weight="medium" className="mb-2">
            Sample Photos
          </Text>

          <div className="mt-2">
            <div className="flex flex-wrap gap-4">
              {photoPreviewUrls.map((url, index) => (
                <div key={index} className="relative mt-2">
                  <img
                    src={url}
                    alt={`Sample vial ${index + 1}`}
                    className="border-gray-300 h-32 w-32 rounded border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemovePhoto(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-neutral-100">
                <label
                  htmlFor="photo-upload"
                  className="flex h-full w-full cursor-pointer items-center justify-center"
                >
                  <span className="text-gray-500 flex flex-col items-center justify-center p-2 text-center text-sm font-semibold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-1 h-8 w-8"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add photo
                  </span>

                  <input
                    id="photo-upload"
                    name="photo-upload"
                    type="file"
                    accept="image/*,video/*,application/pdf"
                    onChange={onPhotoUpload}
                    className="sr-only"
                    multiple
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 pt-2">
          <div className="mb-4 flex items-center justify-between">
            <Text variant="subtitle" weight="medium">
              Sample Photos ({fieldVisitData.samplePhotos.length})
            </Text>

            <div className="flex items-center">
              <label
                htmlFor="existing-photo-upload"
                className="bg-blue-600 hover:bg-blue-700 flex cursor-pointer items-center rounded-md px-3 py-2 text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Add More Photos</span>
                <input
                  id="existing-photo-upload"
                  name="existing-photo-upload"
                  type="file"
                  accept="image/*,video/*,application/pdf"
                  onChange={onPhotoUpload}
                  className="sr-only"
                  multiple
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {fieldVisitData.samplePhotos.map((photo, index) => (
              <div key={photo.id || index} className="group relative">
                {/* Image thumbnail container */}
                <div
                  className="border-gray-200 aspect-square cursor-pointer overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
                  onClick={() => handlePhotoClick(index)}
                >
                  <img
                    src={photo.url}
                    alt={`Sample ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-gray-500 mt-1 truncate text-xs">
                  {photo.file_name || `Sample ${index + 1}`}
                </div>
              </div>
            ))}
          </div>

          {selectedPhoto !== null && fieldVisitData.samplePhotos[selectedPhoto] && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
              onClick={closePhotoView}
            >
              <div className="relative max-h-full max-w-4xl p-4">
                <button
                  className="absolute right-2 top-2 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white"
                  onClick={closePhotoView}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="relative">
                  <img
                    src={fieldVisitData.samplePhotos[selectedPhoto].url}
                    alt={`Sample ${selectedPhoto + 1}`}
                    className="max-h-screen max-w-full object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                    <p className="text-sm font-medium">
                      {fieldVisitData.samplePhotos[selectedPhoto].file_name ||
                        `Sample ${selectedPhoto + 1}`}
                    </p>
                    <p className="text-xs opacity-80">
                      {selectedPhoto + 1} of {fieldVisitData.samplePhotos.length} photos
                      {fieldVisitData.samplePhotos[selectedPhoto].format &&
                        ` • ${fieldVisitData.samplePhotos[selectedPhoto].format.toUpperCase()}`}
                    </p>
                  </div>

                  {selectedPhoto > 0 && (
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhoto(selectedPhoto - 1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {selectedPhoto < fieldVisitData.samplePhotos.length - 1 && (
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhoto(selectedPhoto + 1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PhotoUploadSection;
