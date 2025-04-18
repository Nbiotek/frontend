import { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import RecptsAnalytics from './RecptsAnalytics';
import ApptTodayTable from '../components/ApptTodayTable';
import PatientsRegTable from '../components/PatientsRegTable';

const card = [
  {
    stat: 1071,
    title: 'Total patients',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalPatients'
  },

  {
    stat: 113,
    title: 'Pending Test Reviews',
    type: EnumOverviewIcon.TEST,
    tag: 'pendingTestReviews'
  },

  {
    stat: 161,
    title: 'Referral Activity',
    type: EnumOverviewIcon.CHART,
    tag: 'referralActivity'
  },

  {
    stat: 2,
    title: 'Acceptance Rate',
    type: EnumOverviewIcon.TIMER,
    tag: 'acceptanceRate'
  }
];

const DashboardView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <RecptsAnalytics {...{ card }} />
      <ApptTodayTable />
      <PatientsRegTable />
    </div>
  );
};

export default DashboardView;
