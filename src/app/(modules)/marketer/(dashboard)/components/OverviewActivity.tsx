import CardMetrics from '@/atoms/Cards/metric';
import { AppointmentsIcon, ResultIcon, HealthProfileIcon, MessagesIcon } from '@/lib/utils/svg';
import OverviewCardLoader from '@/atoms/Loaders/OverviewCardLoader';

interface OverviewProps {
  isLoading?: boolean;
  overviewData: TFieldOfficerAnalytics;
}

const card = [
  {
    stat: 120,
    title: 'Samples Collected',
    icon: <AppointmentsIcon />,
    tag: 'totalSamplesCollected'
  },

  {
    stat: 1500,
    title: 'Assigned Tasks',
    icon: <ResultIcon />,
    tag: 'totalAssignedTask'
  },

  {
    stat: 2,
    title: 'Uploaded Samples',
    icon: <MessagesIcon />,
    tag: 'totaluploadedSample'
  }
];

const OverviewActivity = ({ isLoading, overviewData }: OverviewProps) => {
  return (
    <div className="grid w-full grid-cols-response gap-[20px]">
      {isLoading
        ? card.map((el, idx) => <OverviewCardLoader key={el.tag} />)
        : card.map((el, idx) => (
            <CardMetrics
              key={el.tag}
              icon={el.icon}
              stat={overviewData[el.tag as keyof TFieldOfficerAnalytics] || 0}
              title={el.title}
            />
          ))}
    </div>
    // <div className="grid w-full grid-cols-response gap-[20px]">
    //   <CardMetrics
    //     title="Pending Test Results"
    //     value={0}
    //     icon={<AppointmentsIcon />}
    //     isLoading={false}
    //   />
    //   <CardMetrics title="Completed Results" value={0} icon={<ResultIcon />} isLoading={false} />

    //   <CardMetrics title="Referals" value={0} icon={<MessagesIcon />} isLoading={false} />
    // </div>
  );
};

export default OverviewActivity;
