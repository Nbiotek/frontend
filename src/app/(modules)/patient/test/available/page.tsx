import { Metadata } from 'next';
import AvailableTestView from './AvailableTestView';

export const metadata: Metadata = {
  title: 'Available Tests | NBiotek',
  description:
    'Browse and book from our comprehensive catalog of available medical tests. Find diagnostic tests, health screenings, and lab services with detailed information, pricing, and easy booking options.'
};

const TestPage = () => {
  return <AvailableTestView />;
};

export default TestPage;
