import { Metadata } from 'next';
import MarketerDashboardView from './MarketerDashboardView';

export const metadata: Metadata = {
  title: 'Marketer Dashboard | NBiotek',
  description:
    'Access your marketing dashboard to manage campaigns, track performance metrics, analyze customer engagement, and drive business growth through data-driven marketing strategies.'
};

const MarketerDashboardPage = () => {
  return <MarketerDashboardView />;
};

export default MarketerDashboardPage;
