import { Metadata } from 'next';
import PatientView from './PatientView';

export const metadata: Metadata = {
  title: 'Patient Dashboard | NBiotek',
  description:
    'Access your medical test results, upcoming appointments, and health information on your personalized patient dashboard.'
};

const PatientDashboard = () => {
  return <PatientView />;
};

export default PatientDashboard;
