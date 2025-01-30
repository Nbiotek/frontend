import { Text } from '@/lib/utils/Text';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const CardMetrics = ({ title, value, icon }: CardProps) => {
  return (
    <div className="flex w-[239px] items-center justify-between rounded-lg bg-white p-4 shadow-lg">
      <div className="space-y-2">
        <Text variant="body" weight="light">
          {title}
        </Text>
        <Text weight="bold" className="text-[26px]">
          {value}
        </Text>
      </div>
      {icon}
    </div>
  );
};

export default CardMetrics;
