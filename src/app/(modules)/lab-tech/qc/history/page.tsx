import { type Metadata } from 'next';
import QCHistoryView from './QCHistoryView';
import ROUTES from '@/constants/routes';

const { title, description } = ROUTES.LAB_TECH_QUALITY_CONTROL_HISTORY;

export const metadata: Metadata = {
  title,
  description
};

const QCPendingPage = () => {
  return <QCHistoryView />;
};

export default QCPendingPage;
