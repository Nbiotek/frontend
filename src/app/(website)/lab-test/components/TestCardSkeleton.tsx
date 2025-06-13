// TestCardSkeleton.tsx
import React from 'react';

const Skeleton = ({
  className = '',
  height = 'h-4',
  width = 'w-full'
}: {
  className?: string;
  height?: string;
  width?: string;
}) => <div className={`bg-gray-200 animate-pulse rounded-md ${height} ${width} ${className}`} />;

export const TestCardSkeleton = () => (
  <div className="flex flex-col rounded-xl border border-neutral-100 bg-neutral-100 p-6 shadow-sm">
    {/* Category and Badge */}
    <div className="mb-4 flex items-center justify-between">
      <Skeleton width="w-24" height="h-6" className="rounded-full" />
      <Skeleton width="w-16" height="h-5" className="rounded-md" />
    </div>

    {/* Title */}
    <Skeleton width="w-3/4" height="h-6" className="mb-3" />

    {/* Description - Multiple lines */}
    <div className="mb-4 flex-grow space-y-2 bg-neutral-75">
      <Skeleton width="w-full" height="h-4" />
      <Skeleton width="w-5/6" height="h-4" />
      <Skeleton width="w-4/5" height="h-4" />
    </div>

    {/* Features bar */}
    <Skeleton width="w-full" height="h-10" className="mb-4 rounded-lg" />

    {/* Action buttons */}
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Skeleton width="w-full" height="h-10" className="rounded-md" />
        <Skeleton width="w-full" height="h-10" className="rounded-md" />
      </div>

      {/* Consultation message area */}
      <div className="border-t border-neutral-300 pt-2">
        <Skeleton width="w-3/4" height="h-3" className="mx-auto" />
      </div>
    </div>
  </div>
);

// PackageTestSkeleton.tsx
export const PackageTestSkeleton = () => (
  <div className="border-gray-100 flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm lg:flex-row">
    {/* Main Package Section */}
    <div className="flex flex-1 flex-col">
      <div className="animate-pulse space-y-4 bg-neutral-200 p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <Skeleton width="w-32" height="h-8" className="rounded-lg bg-neutral-300" />
          <Skeleton width="w-24" height="h-8" className="bg-gray-300 rounded-lg" />
        </div>

        <Skeleton width="w-2/3" height="h-8" className="bg-gray-300" />
        <div className="space-y-2">
          <Skeleton width="w-full" height="h-4" className="bg-gray-300" />
          <Skeleton width="w-4/5" height="h-4" className="bg-gray-300" />
        </div>

        {/* Package highlights box */}
        <div className="bg-gray-300 rounded-lg p-4">
          <Skeleton width="w-32" height="h-4" className="bg-gray-400 mb-2" />
          <Skeleton width="w-full" height="h-4" className="bg-gray-400" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 p-6 sm:flex-row">
        <Skeleton width="w-full" height="h-10" className="rounded-md" />
        <Skeleton width="w-full" height="h-10" className="rounded-md" />
      </div>

      {/* Consultation message */}
      <div className="border-gray-100 border-t px-6 pb-4 pt-3 text-center">
        <Skeleton width="w-2/3" height="h-3" className="mx-auto" />
      </div>
    </div>

    {/* Included Tests Section */}
    <div className="border-gray-100 bg-gray-50 flex-1 border-t p-6 sm:p-8 lg:border-l lg:border-t-0">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton width="w-32" height="h-6" />
        <Skeleton width="w-16" height="h-6" className="rounded-full" />
      </div>

      <div className="space-y-5">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index}>
            <Skeleton width="w-3/4" height="h-5" className="mb-2" />
            <div className="relative pl-4">
              <div className="bg-gray-200 absolute bottom-0 left-0 top-0 w-[3px] rounded-full"></div>
              <div className="space-y-1">
                <Skeleton width="w-full" height="h-3" />
                <Skeleton width="w-5/6" height="h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package benefits */}
      <div className="bg-gray-100 mt-6 rounded-lg p-4">
        <Skeleton width="w-40" height="h-4" className="mb-2" />
        <div className="space-y-1">
          <Skeleton width="w-full" height="h-3" />
          <Skeleton width="w-4/5" height="h-3" />
          <Skeleton width="w-3/4" height="h-3" />
          <Skeleton width="w-5/6" height="h-3" />
        </div>
      </div>
    </div>
  </div>
);

export default { TestCardSkeleton, PackageTestSkeleton };
