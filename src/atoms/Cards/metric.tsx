import { Skeleton } from '@/components/ui/skeleton';
import Spinner from '@/lib/utils/spinner';
import { Text } from '@/lib/utils/Text';

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading: boolean;
}

const CardMetrics = ({ title, value, icon, isLoading }: CardProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-lg ">
      <div className="space-y-2">
        <Text variant="body" weight="light">
          {title}
        </Text>

        {isLoading ? (
          <Spinner />
        ) : (
          <Text weight="bold" className="text-[26px]">
            {value ?? 0}
          </Text>
        )}
      </div>
      {icon}
    </div>
  );
};

export default CardMetrics;
