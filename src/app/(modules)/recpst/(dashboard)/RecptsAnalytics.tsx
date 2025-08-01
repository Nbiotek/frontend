import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import { Skeleton } from '@/components/ui/skeleton';

const card: Array<{
  stat: number;
  title: string;
  type: EnumOverviewIcon;
  tag: string;
}> = [
  {
    stat: 0,
    title: 'Appointments today',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'todayAppointments'
  },
  {
    stat: 0,
    title: 'Pending appointments',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'pendingAppointments'
  },

  {
    stat: 0,
    title: 'Total appointments',
    type: EnumOverviewIcon.CHART,
    tag: 'totalAppointments'
  },

  {
    stat: 0,
    title: 'Total patients',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalPatients'
  }
];

interface IRecptsAnalyticsProps {
  isLoading: boolean;
  summary: TReceptionistDashboardSummary;
}

const RecptsAnalytics = ({ isLoading, summary }: IRecptsAnalyticsProps) => {
  return (
    <OverviewContainer>
      {isLoading
        ? card.map((el) => <Skeleton key={el.tag} className="h-28 w-full" />)
        : card.map((el) => (
            <OverviewCard
              key={el.tag}
              type={el.type}
              stat={summary ? summary[el.tag as keyof TReceptionistDashboardSummary] : el.stat}
              title={el.title}
            />
          ))}
    </OverviewContainer>
  );
};

export default RecptsAnalytics;
