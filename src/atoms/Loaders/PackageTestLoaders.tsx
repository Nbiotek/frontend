const Skeleton = ({
  className = '',
  height = 'h-4',
  width = 'w-full'
}: {
  className?: string;
  height?: string;
  width?: string;
}) => <div className={`animate-pulse rounded-md bg-neutral-400 ${height} ${width} ${className}`} />;

const PackageTestSkeleton = () => (
  <div className="mb-8 flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
    <div className="flex flex-1 flex-col space-y-4">
      <div className="bg-gray-100 space-y-4 rounded-lg p-6 md:p-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <Skeleton width="w-28" height="h-8" className="rounded-lg" />
          <Skeleton width="w-16" height="h-8" className="rounded-lg" />
        </div>

        <Skeleton width="w-2/3" height="h-7" />

        <Skeleton width="w-full" height="h-5" />
      </div>

      <div className="flex w-full flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Skeleton width="w-32" height="h-12" className="rounded-sm" /> {/* Add to cart */}
        <Skeleton width="w-32" height="h-12" className="rounded-sm" /> {/* Request Test */}
      </div>
    </div>

    <div className="border-gray-100 flex-1 space-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <Skeleton width="w-32" height="h-6" />

      {[1, 2].map((_, index) => (
        <div className="space-y-3" key={index}>
          <Skeleton width="w-3/4" height="h-6" />

          <div className="relative pl-4">
            <div className="bg-gray-200 absolute bottom-0 left-0 top-0 w-[3px] rounded-full"></div>
            <Skeleton width="w-full" height="h-4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface PackageTestLoaderProps {
  count?: number;
  className?: string;
}

const PackageTestLoader: React.FC<PackageTestLoaderProps> = ({ count = 2, className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <PackageTestSkeleton key={index} />
      ))}
    </div>
  );
};

export default PackageTestLoader;
