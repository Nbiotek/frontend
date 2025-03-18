import { type Metadata } from 'next';
import ROUTES from '@/constants/routes';
import QualityControlView from './QualityControlView';

const { title, description } = ROUTES.LAB_COORD_QUALITY_CONTROL;

export const metadata: Metadata = {
  title,
  description
};

const QualityControlPage = () => {
  return <QualityControlView />;
};

export default QualityControlPage;
