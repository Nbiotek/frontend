import { Metadata } from 'next';
import DoctorDashboardView from './DoctorDashboardView';

export const metadata: Metadata = {
  title: 'Doctor Dashboard | NBiotek',
  description:
    'Access your comprehensive doctor dashboard. Manage patient appointments, review test results, monitor patient progress, and handle medical consultations efficiently.'
};

const DoctorsViewPage = () => {
  return <DoctorDashboardView />;
};

export default DoctorsViewPage;
