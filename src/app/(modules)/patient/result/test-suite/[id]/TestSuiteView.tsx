// TestSuiteView.tsx
'use client';

import TestResult from '../../components/Results';
import { useTestSuiteDetails } from '@/hooks/patient/useTestResult';
import { useParams } from 'next/navigation';
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import { dateTimeUTC } from '@/utils/date';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft, FileText, ChevronLeft, ChevronRight, X } from 'lucide-react';
import TestSuiteDetails from './components/TestSuiteDetails';
import Button from '@/atoms/Buttons';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const TestSuiteView = () => {
  const param = useParams();
  const resultId = param.id as string;
  const { data, isLoading, error } = useTestSuiteDetails(resultId as string);

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mediaType, setMediaType] = useState<'testMedia' | 'samplePhotos'>('testMedia');

  const handleResultSuiteView = (link: string) => {
    window.open(link, '_blank');
  };

  // Navigate to next image
  const handleNextImage = () => {
    const currentMediaArray =
      mediaType === 'testMedia' ? data?.data?.media : data?.data?.samplePhotos;
    if (currentMediaArray && currentMediaArray.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === currentMediaArray.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    const currentMediaArray =
      mediaType === 'testMedia' ? data?.data?.media : data?.data?.samplePhotos;
    if (currentMediaArray && currentMediaArray.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? currentMediaArray.length - 1 : prevIndex - 1
      );
    }
  };

  console.log(data);

  // Error state
  if (error) {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center rounded-lg bg-white p-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="mb-2 text-xl font-bold">Unable to Load Test Results</h2>
        <p className="text-gray-600 mb-6 max-w-md text-center">
          We&apos;re having trouble retrieving your test results. This could be due to a connection
          issue or the data may no longer be available.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex w-full flex-col space-y-[24px] pb-[30px]">
        <div className="rounded-lg bg-white p-[24px]">
          <Skeleton className="mb-[24px] h-8 w-64" />
          <div className="flex flex-col space-y-[24px]">
            <div className="flex gap-[24px]">
              <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="flex-1">
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>

        {/* Test Results Loading State */}
        <div className="rounded-lg bg-white p-[24px]">
          <Skeleton className="mb-[24px] h-8 w-64" />

          <div className="space-y-[24px]">
            <div className="flex space-x-[24px] border-b pb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1">
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>

            {[1, 2, 3, 4, 5].map((row) => (
              <div
                key={row}
                className="border-gray-200 flex items-start space-x-[24px] border-b-2 border-dotted pb-4"
              >
                {[1, 2, 3, 4].map((col) => (
                  <div key={col} className="flex-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data?.data) {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center rounded-lg bg-white p-6">
        <div className="bg-gray-100 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <FileText className="text-gray-500 h-10 w-10" />
        </div>
        <h2 className="mb-2 text-xl font-bold">No Test Results Found</h2>
        <p className="text-gray-600 mb-6 max-w-md text-center">
          There are no results available for this test at this time. Results may still be processing
          or may not have been recorded.
        </p>
      </div>
    );
  }

  // Data loaded successfully
  return (
    <div className="flex w-full flex-col space-y-[24px] pb-[30px]">
      <button
        onClick={() => window.history.back()}
        className="text-blue-500 mt-3 flex items-center hover:underline"
      >
        <ArrowLeft className="mr-1 w-4" />
        Back to Test Results
      </button>
      <div className="rounded-lg bg-white p-[24px]">
        <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
          Personal Information
        </Text>
        <div className="flex flex-col space-y-[24px]">
          <FieldSet legend="Test Ordered" text={data?.data.title} />
          <div className="flex gap-[24px]">
            <FieldSet legend="Patient Name" text={data?.data.patientName} />
            <FieldSet
              legend="Appointment Date"
              text={dateTimeUTC(data?.data.appointmentDate, false)}
            />
          </div>
          {/* <FieldSet legend="Technician Name" text={data?.data.technician.name} /> */}
        </div>
      </div>
      <TestSuiteDetails tests={data?.data.tests} />

      {/* Media and Sample Photos Section */}
      {(data?.data?.media && data.data.media.length > 0) ||
      (data?.data?.samplePhotos && data.data.samplePhotos.length > 0) ? (
        <div className="rounded-lg bg-white p-[24px]">
          <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
            Test Media & Sample Photos
          </Text>

          {/* Test Media */}
          {data?.data?.media && data.data.media.length > 0 && (
            <div className="mb-6">
              <Text variant="subtitle" weight="medium" className="mb-3">
                Test Media ({data.data.media.length})
              </Text>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {data.data.media.map((media, index) => (
                  <div
                    key={media.uuid}
                    className="border-gray-200 group relative cursor-pointer overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setMediaType('testMedia');
                      setIsMediaModalOpen(true);
                    }}
                  >
                    <img
                      src={media.file_url}
                      alt={`Test media ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20">
                      <span className="font-medium text-white opacity-0 group-hover:opacity-100">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Photos */}
          {data?.data?.samplePhotos && data.data.samplePhotos.length > 0 && (
            <div>
              <Text variant="subtitle" weight="medium" className="mb-3">
                Sample Photos ({data.data.samplePhotos.length})
              </Text>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {data.data.samplePhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="border-gray-200 group relative cursor-pointer overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setMediaType('samplePhotos');
                      setIsMediaModalOpen(true);
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={`Sample photo ${index + 1}`}
                      className="h-32 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20">
                      <span className="font-medium text-white opacity-0 group-hover:opacity-100">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      <Button variant="danger" onClick={() => handleResultSuiteView(data.data.resultLink)}>
        Download All Results
      </Button>

      {/* Media Modal */}
      <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent className="max-w-4xl">
          <div className="flex flex-col items-center">
            {(() => {
              if (mediaType === 'testMedia') {
                const currentMediaItem = data?.data?.media?.[currentImageIndex];
                if (!currentMediaItem) return null;

                return (
                  <>
                    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg bg-black">
                      <img
                        src={currentMediaItem.file_url}
                        alt={`Test media ${currentImageIndex + 1}`}
                        className="h-full w-full object-contain"
                      />

                      {/* Navigation arrows */}
                      {data?.data?.media && data.data.media.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevImage();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 hover:bg-white"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextImage();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 hover:bg-white"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-lg font-medium">
                        {currentImageIndex + 1} of {data?.data?.media?.length}
                      </p>
                      <p className="text-gray-500 mt-1 text-sm">Test Media</p>
                    </div>
                  </>
                );
              } else {
                const currentSamplePhoto = data?.data?.samplePhotos?.[currentImageIndex];
                if (!currentSamplePhoto) return null;

                return (
                  <>
                    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg bg-black">
                      <img
                        src={currentSamplePhoto.url}
                        alt={`Sample photo ${currentImageIndex + 1}`}
                        className="h-full w-full object-contain"
                      />

                      {/* Navigation arrows */}
                      {data?.data?.samplePhotos && data.data.samplePhotos.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevImage();
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 hover:bg-white"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextImage();
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white/70 p-2 hover:bg-white"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-lg font-medium">
                        {currentImageIndex + 1} of {data?.data?.samplePhotos?.length}
                      </p>
                      <p className="text-gray-500 mt-1 text-sm">Sample Photos</p>
                    </div>
                  </>
                );
              }
            })()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestSuiteView;
