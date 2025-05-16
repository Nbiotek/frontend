import { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import RecptsAnalytics from './RecptsAnalytics';
import ApptTodayTable from '../components/ApptTodayTable';
import PatientsRegTable from '../components/PatientsRegTable';
import HyperLink from '@/atoms/Hyperlink';
import ROUTES from '@/constants/routes';
import { SubTitle } from '@/atoms/typographys';
import { pagination } from '@/constants/data';

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

      <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
        <div className="flex w-full items-center justify-between border-b pb-2">
          <SubTitle text="Appointments" className="whitespace-nowrap" />

          <div className="flex w-full justify-end">
            <HyperLink href={ROUTES.RECPTS_APOINTMENT.path} hrefText="See all" />
          </div>
        </div>

        <ApptTodayTable {...{ isLoading: false, appointment: { appointment: [], pagination } }} />
      </div>

      {/* <div className="flex w-full flex-col space-y-4 rounded-lg bg-white p-2">
        <div className="flex w-full items-center justify-between border-b pb-2">
          <SubTitle text="Patients" className="whitespace-nowrap" />

          <div className="flex w-full justify-end">
            <HyperLink href={ROUTES.RECPTS_PATIENT.path} hrefText="See all" />
          </div>
        </div>

        <PatientsRegTable />
      </div> */}
    </div>
  );
};

export default DashboardView;
