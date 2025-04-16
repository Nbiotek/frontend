import { Skeleton } from '@/components/ui/skeleton';
import Spinner from '@/lib/utils/spinner';
import { Text } from '@/lib/utils/Text';

interface CardProps {
  title: string;
  stat: number;
  icon: React.ReactNode;
}

const CardMetrics = ({ title, stat, icon }: CardProps) => {
  console.log(stat);
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
