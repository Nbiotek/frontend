import { type Metadata } from 'next';
import QCPendingView from './QCPendingView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH_QUALITY_CONTROL_PENDING;

export const metadata: Metadata = {
  title,
  description
};

const QCPendingPage = () => {
  return <QCPendingView />;
};

export default QCPendingPage;
