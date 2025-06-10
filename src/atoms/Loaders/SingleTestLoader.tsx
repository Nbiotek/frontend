const Skeleton = ({
  className = '',
  height = 'h-4',
  width = 'w-full'
}: {
  className?: string;
  height?: string;
  width?: string;
}) => <div className={`animate-pulse rounded-md bg-neutral-400 ${height} ${width} ${className}`} />;

const SingleTestSkeleton = () => (
  <div className="flex w-full flex-col space-y-4 p-4 md:w-[300px] lg:w-[450px]">
    <Skeleton width="w-3/4" height="h-6" />

    <div className="space-y-2">
      <Skeleton width="w-full" height="h-4" />
      <Skeleton width="w-4/5" height="h-4" />
    </div>

    <div className="flex space-x-2">
      <Skeleton width="w-28" height="h-10" />
      <Skeleton width="w-24" height="h-10" />
    </div>
  </div>
);

interface SimpleTestLoaderProps {
  count?: number;
  className?: string;
}

const SingleTestLoader: React.FC<SimpleTestLoaderProps> = ({ count = 6, className = '' }) => {
  return (
    <div className={`flex flex-wrap justify-between gap-4 sm:gap-5 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <SingleTestSkeleton key={index} />
      ))}
    </div>
  );
};

export default SingleTestLoader;
