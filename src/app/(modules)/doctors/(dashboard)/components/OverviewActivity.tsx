import CardMetrics from '@/atoms/Cards/metric';
import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

const OverviewActivity = () => {
  return (
    <div className="grid w-full grid-cols-response gap-[20px]">
      <CardMetrics
        title="Pending Test Results"
        value={0}
        icon={<AppointmentsIcon />}
        isLoading={false}
      />
      <CardMetrics title="Completed Results" value={0} icon={<ResultIcon />} isLoading={false} />

      <CardMetrics title="Referals" value={0} icon={<MessagesIcon />} isLoading={false} />
    </div>
  );
};

export default OverviewActivity;
