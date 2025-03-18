// TestSuiteView.tsx
'use client';

import TestResult from '../../components/Results';
import { useTestSuiteDetails } from '@/hooks/patient/useTestResult';
import { useParams } from 'next/navigation';
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import { dateTimeUTC } from '@/utils/date';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import TestSuiteDetails from './components/TestSuiteDetails';
import Button from '@/atoms/Buttons';

const TestSuiteView = () => {
  const param = useParams();
  const resultId = param.id as string;
  const { data, isLoading, error } = useTestSuiteDetails(resultId as string);

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
          <FieldSet legend="Test Ordered" text={data?.data.description} />
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
      <Button variant="danger">Download All Results</Button>
    </div>
  );
};

export default TestSuiteView;
