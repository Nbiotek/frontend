import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';

interface ICoordAnalyticsProps {
  summary?: TLabCoordDashboardSummary;
  card: Array<{
    stat: number;
    title: string;
    type: EnumOverviewIcon;
    tag: string;
  }>;
}

const CoordAnalytics = ({ summary, card }: ICoordAnalyticsProps) => {
  return (
    <OverviewContainer>
      {card.map((el) => (
        <OverviewCard
          key={el.tag}
          type={el.type}
          stat={summary ? summary[el.tag as keyof TLabCoordDashboardSummary] : el.stat}
          title={el.title}
        />
      ))}
    </OverviewContainer>
  );
};

export default CoordAnalytics;
