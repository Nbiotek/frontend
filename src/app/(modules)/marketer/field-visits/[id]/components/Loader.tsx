import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SampleCollectionSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Patient Information</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Patient Name</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Test Ordered</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Collection Date</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Test Ordered</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">CBC</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Lipid Panel</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Urinalysis</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-500 text-sm">Request Date</p>
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Log Samples</h2>
        <div className="mb-4">
          <div className="bg-blue-600 mb-1 grid grid-cols-1 gap-4 rounded-lg p-4 md:grid-cols-4">
            <div className="font-medium text-white">Test Name</div>
            <div className="font-medium text-white">Sample Type</div>
            <div className="font-medium text-white">Required Amount</div>
            <div className="font-medium text-white">Collection Status</div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b py-4 md:grid-cols-4">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <div className="flex justify-end">
              <Skeleton className="h-6 w-6 rounded-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-b py-4 md:grid-cols-4">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <div className="flex justify-end">
              <Skeleton className="h-6 w-6 rounded-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-4">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/3" />
            <div className="flex justify-end">
              <Skeleton className="h-6 w-6 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Sample Photos</h2>
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default SampleCollectionSkeleton;
