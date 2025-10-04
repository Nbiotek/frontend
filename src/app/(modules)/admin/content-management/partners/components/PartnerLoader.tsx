import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const PartnerLoader = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <Skeleton className="h-24 w-full" />

      <div className="flex w-full flex-col space-y-2">
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
};

export default PartnerLoader;
