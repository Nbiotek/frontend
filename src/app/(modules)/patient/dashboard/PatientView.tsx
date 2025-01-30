import CardMetrics from '@/components/dashboard/metric/card';

import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

const PatientView = () => {
  return (
    <div className="container flex flex-col px-[12px]">
      <div className="flex w-full flex-wrap gap-[25px]">
        <CardMetrics title="My Appointments" value="46,000" icon={<AppointmentsIcon />} />
        <CardMetrics title="Test Results" value="46,000" icon={<ResultIcon />} />
        <CardMetrics title="Health Profile" value="46,000" icon={<HealthProfileIcon />} />
        <CardMetrics title="Messages" value="46,000" icon={<MessagesIcon />} />
      </div>

      <div className=""></div>
    </div>
  );
};

export default PatientView;
