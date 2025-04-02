'use client';

import SearchInput from '@/atoms/fields/SearchInput';
import IconPod from '@/atoms/Icon/IconPod';
import { Text } from '@/lib/utils/Text';
import { ArrowUpDown, ListFilter, ClipboardList, Receipt, Calendar } from 'lucide-react';
import Button from '@/atoms/Buttons';
import ReviewTestTable from './components/TestReviewTable';

import { useTestReview } from '@/hooks/doctor/useTestReview';
import { useEffect } from 'react';

const ReviewTestView = () => {
  const { data: reviewTests, isLoading } = useTestReview();

  return (
    <div className="flex-col space-y-[24px]">
      <div className="flex flex-col space-x-2 sm:flex-row sm:items-center sm:justify-between">
        <IconPod Icon={ListFilter} />
        <SearchInput className="!w-[calc(100%-80px)]" placeholder="Search transactions..." />
        <IconPod Icon={ArrowUpDown} />
      </div>
      <ReviewTestTable reviewTests={reviewTests?.data.tests || []} loading={isLoading} />
    </div>
  );
};

export default ReviewTestView;
