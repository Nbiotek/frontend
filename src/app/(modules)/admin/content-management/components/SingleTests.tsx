'use client';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchSingleTest } from '@/hooks/admin/useFetchSingleTest';
import TestCard from './TestCard';

const SingleTests = () => {
  const { data, status } = useFetchSingleTest({});

  return (
    <div className="flex h-[80vh] w-full flex-col space-y-4 overflow-y-scroll">
      {status === 'pending' &&
        Array(10)
          .fill(1)
          .map((_, id) => <Skeleton key={id} className="h-96 w-full" />)}
      {status === 'success' &&
        data?.requests &&
        data.requests.map((datum) => <TestCard key={datum.id} {...{ datum }} />)}

      {status === 'success' && data?.requests && data.requests.length == 0 && (
        <div className="h-3/4 w-full rounded-lg bg-white">
          <EmptyState title="No Individual test." />
        </div>
      )}
    </div>
  );
};

export default SingleTests;
