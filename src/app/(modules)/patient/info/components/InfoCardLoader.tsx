import { Skeleton } from '@/components/ui/skeleton';

const InfoCardLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Profile header with avatar skeleton */}
      <div className="relative h-[94px] rounded-lg bg-blue-100">
        <div className="bg-gray-200 absolute left-1/2 top-[6rem] h-[163px] w-[163px] -translate-x-1/2 -translate-y-1/2 transform rounded-full" />
      </div>

      {/* Personal Info Section */}
      <div className="mt-[7rem] rounded-lg bg-white p-[24px]">
        <Skeleton className="mx-auto mb-6 h-8 w-64" />

        <div className="space-y-6">
          {/* Name fields */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Phone & Status */}
          <div className="space-y-2">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Gender & DOB */}
          <div className="space-y-2">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance & Contact sections */}
      <div className="mt-[24px] flex flex-col justify-between gap-[24px] md:flex-row">
        <div className="flex-1 rounded-lg bg-white p-[24px]">
          <Skeleton className="mx-auto mb-6 h-8 w-64" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-4 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-lg bg-white p-[24px]">
          <Skeleton className="mx-auto mb-6 h-8 w-64" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-4 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCardLoader;
