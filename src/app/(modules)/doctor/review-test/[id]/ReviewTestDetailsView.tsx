'use client';
// import TestResult from '../components/Results';
import { useParams, useRouter } from 'next/navigation';
import FieldSet from '@/atoms/fields/FieldSet';
import { Text } from '@/lib/utils/Text';
import { dateTimeUTC } from '@/utils/date';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import Button from '@/atoms/Buttons';

import { useTestRevDetails } from '@/hooks/doctor/useTestReview';
import TestReviewDetailsResult from '../components/TestReviewDetailsResult';
import RecommendationDialog from './component/RecomendationDialog';
import { useState } from 'react';

const ReviewTestDetailsView = () => {
  const param = useParams();
  const revIiewd = param.id as string;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useTestRevDetails(revIiewd);

  const handleRecommendationDialog = () => {
    setIsModalOpen(true);
  };

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
          Patient Information
        </Text>
        <div className="flex flex-col space-y-[24px]">
          <div className="flex gap-[24px]">
            <FieldSet legend="Name" text={data?.data.patient.name} />
            <FieldSet legend="Test Ordered" text={data?.data.test.name} />
            {/* <FieldSet legend="Test Date" text={dateTimeUTC(data?.data.createdAt || '', false)} /> */}
          </div>
          <div className="flex gap-[24px]">
            <FieldSet legend="Technician Name" text={data?.data.technician.name} />
            <FieldSet legend="Doctor Name" text={data?.data.doctor?.name || ''} />
          </div>
        </div>
      </div>
      <TestReviewDetailsResult data={data?.data?.results || []} />
      <div className="bg-white p-[24px]">
        <Text variant="title" weight="semibold" className="mb-[24px] border-b pb-2">
          Recommendation
        </Text>
        <FieldSet legend="Comment" text={data?.data.notes || 'No recommendation yet'} />

        {data?.data.doctor === null || data?.data.notes == undefined ? (
          <Button variant="danger" className="mt-5 w-40" onClick={handleRecommendationDialog}>
            {' '}
            Write recommendation
          </Button>
        ) : (
          ''
        )}
      </div>
      {/* <Button
          variant="filled"
          className="mx-auto w-60"
          onClick={() => handleResultView(data.data.resultLink)}
        >
          {' '}
          Download Result
        </Button> */}
      <RecommendationDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        id={data?.data.id || ''}
      />
    </div>
  );
};

export default ReviewTestDetailsView;
