import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';
import { Skeleton } from '@/components/ui/skeleton';
import Spinner from '@/lib/utils/spinner';
import { Text } from '@/lib/utils/Text';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  stat: number;
  icon: React.ReactNode;
}

const CardMetrics = ({ title, stat, icon }: CardProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-lg ">
      <div className="space-y-2">
        <Text variant="body" weight="light">
          {title}
        </Text>

        <Text weight="bold" className="text-[26px]">
          {stat}
        </Text>
      </div>
      {icon}
    </div>
  );
};

export default CardMetrics;
