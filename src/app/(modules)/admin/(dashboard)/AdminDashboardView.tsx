import OverviewCard, { EnumOverviewIcon } from '@/components/dashboard/metric/OverviewCard';
import OverviewContainer from '@/components/dashboard/metric/OverviewContainer';
import { GrowthChart } from './components/GrowthChart';

const card = [
  {
    stat: 4056,
    title: 'Total users',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalUsers'
  },

  {
    stat: 2078,
    title: 'Active patients',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'activePatients'
  },

  {
    stat: 51,
    title: 'Total Technicians',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalTechnicians'
  },

  {
    stat: 24,
    title: 'Total Doctors',
    type: EnumOverviewIcon.PEOPLE,
    tag: 'totalDoctors'
  }
];

const AdminDashboardView = () => {
  return (
    <div className="flex w-full flex-col space-y-4">
      <OverviewContainer>
        {card.map((el) => (
          <OverviewCard key={el.tag} type={el.type} stat={el.stat} title={el.title} />
        ))}
      </OverviewContainer>

      <GrowthChart />
    </div>
  );
};

export default AdminDashboardView;
