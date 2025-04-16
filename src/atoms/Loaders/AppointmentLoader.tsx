import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AppointmentItemSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Date header skeleton */}
      <Skeleton className="h-6 w-32" />

      {/* Appointment card skeleton */}
      <div className="border-gray-200 overflow-hidden rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          {/* Left - Test icon and name */}
          <div className="flex items-center space-x-3">
            {/* Test icon skeleton */}
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="space-y-2">
              {/* Test name skeleton */}
              <Skeleton className="h-5 w-40" />

              {/* Test description skeleton */}
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-3/4 max-w-xl" />
            </div>
          </div>

          {/* Right - Options menu skeleton */}
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Action button skeleton */}
        <div className="mt-4">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Date/time footer skeleton */}
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
};

// Component for multiple appointment skeletons
const AppointmentListSkeleton = () => {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((index) => (
        <AppointmentItemSkeleton key={index} />
      ))}
    </div>
  );
};

export { AppointmentItemSkeleton, AppointmentListSkeleton };
