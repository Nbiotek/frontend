'use client';
import TestResult from '../components/Results';
import { useTestResultDetails } from '@/hooks/patient/useTestResult';
import { useParams, useRouter } from 'next/navigation';
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import { dateTimeUTC } from '@/utils/date';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft, FileText, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/atoms/Buttons';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { useState } from 'react';
import Image from 'next/image';

const ResultView = () => {
  const param = useParams();
  const resultId = param.id as string;
  const { data, isLoading, error } = useTestResultDetails(resultId as string);

  const router = useRouter();

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleResultView = (link: string) => {
    window.open(link, '_blank');
  };

  // Show media gallery modal
  const handleShowMedia = () => {
    setIsMediaModalOpen(true);
  };

  // Navigate to next image
  const handleNextImage = () => {
    if (data?.data?.media && data.data.media.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === (data.data.media?.length || 0) - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (data?.data?.media && data.data.media.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? (data.data.media?.length || 0) - 1 : prevIndex - 1
      );
    }
  };

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
  if (!data || !data.data.results || data.data.results.length === 0) {
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
          <div className="flex gap-[24px]">
            <FieldSet legend="Name" text={data?.data.patient.name} />
            <FieldSet legend="Test Ordered" text={data?.data.test?.name} />
            <FieldSet legend="Test Date" text={dateTimeUTC(data?.data.createdAt, false)} />
          </div>
          <FieldSet legend="Technician Name" text={data?.data.technician.name} />
        </div>
      </div>
      <TestResult data={data?.data?.results} />

      {/* Media Gallery Section */}
      <div className="rounded-lg bg-white p-[24px]">
        <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
          Test Media
        </Text>

        {data?.data?.media && data.data.media.length > 0 ? (
          <>
            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {data.data.media.map((mediaItem: IMediaResp, index) => (
                <div
                  key={mediaItem.uuid || index}
                  className="cursor-pointer rounded-lg border p-2 transition-shadow hover:shadow-md"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setIsMediaModalOpen(true);
                  }}
                >
                  <div className="bg-gray-100 relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={mediaItem.file_url}
                      alt={`Test media ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-gray-500 mt-2 truncate text-sm">Media {index + 1}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No media available for this test</p>
          </div>
        )}
      </div>

      {/* Media Modal */}
      <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent className="sm:max-w-5xl">
          <div className="relative">
            <button
              onClick={() => setIsMediaModalOpen(false)}
              className="absolute right-0 top-0 z-10 rounded-full bg-white p-1 shadow-md"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center">
              {data?.data?.media && data.data.media[currentImageIndex] && (
                <>
                  <div className="relative h-[60vh] w-full overflow-hidden rounded-lg bg-black">
                    <img
                      src={data.data.media[currentImageIndex].file_url}
                      alt={`Test media ${currentImageIndex + 1}`}
                      className="h-full w-full object-contain"
                    />

                    {/* Navigation arrows */}
                    {data.data.media.length > 1 && (
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
                      {currentImageIndex + 1} of {data.data.media.length}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Download Button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="filled"
          className="mx-auto w-60"
          onClick={() => handleResultView(data.data.resultLink)}
        >
          Download Result
        </Button>
      </div>
    </div>
  );
};

export default ResultView;
