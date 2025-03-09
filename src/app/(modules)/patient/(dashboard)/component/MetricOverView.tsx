import CardMetrics from '@/components/dashboard/metric/card';
import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

interface MetricsOverviewProp {
  isLoading: boolean;
  data?: TPatientDashboard;
}

const MetricsOverview = ({ isLoading, data }: MetricsOverviewProp) => {
  return (
    <div className="grid w-full grid-cols-response gap-[20px]">
      <CardMetrics
        title="My Appointments"
        value={data?.totalAppointments ?? 0}
        icon={<AppointmentsIcon />}
        isLoading={isLoading}
      />
      <CardMetrics
        title="Test Results"
        value={data?.totalResult ?? 0}
        icon={<ResultIcon />}
        isLoading={isLoading}
      />

      <CardMetrics
        title="Messages"
        value={data?.totalMessages ?? 0}
        icon={<MessagesIcon />}
        isLoading={isLoading}
      />
    </div>
  );
};

export default MetricsOverview;
