import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';
import CardMetrics from '@/components/dashboard/metric/card';
import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';

interface MetricsOverviewProp {
  isLoading: boolean;
  overviewData: TPatientDashboard;
}
const card = [
  {
    stat: 120,
    title: 'My Appointment',
    icon: <AppointmentsIcon />,
    tag: 'totalAppointments'
  },

  {
    stat: 1500,
    title: 'Test Result',
    icon: <ResultIcon />,
    tag: 'totalTestResults'
  },

  {
    stat: 2,
    title: 'Messages',
    icon: <MessagesIcon />,
    tag: 'totalMessages'
  }
];

const MetricsOverview = ({ isLoading, overviewData }: MetricsOverviewProp) => {
  return (
    <div className="grid w-full grid-cols-response gap-[20px]">
      {isLoading
        ? card.map((el, idx) => <OverviewCardLoader key={el.tag} />)
        : card.map((el, idx) => (
            <CardMetrics
              key={el.tag}
              icon={el.icon}
              stat={overviewData[el.tag as keyof Omit<TPatientDashboard, 'recentAppointments'>]}
              title={el.title}
            />
          ))}
    </div>
    // <div className="grid w-full grid-cols-response gap-[20px]">
    //   <CardMetrics
    //     title="My Appointments"
    //     value={data?.totalAppointments ?? 0}
    //     icon={<AppointmentsIcon />}
    //     isLoading={isLoading}
    //   />
    //   <CardMetrics
    //     title="Test Results"
    //     value={data?.totalResult ?? 0}
    //     icon={<ResultIcon />}
    //     isLoading={isLoading}
    //   />

    //   <CardMetrics
    //     title="Messages"
    //     value={data?.totalMessages ?? 0}
    //     icon={<MessagesIcon />}
    //     isLoading={isLoading}
    //   />
    // </div>
  );
};

export default MetricsOverview;
