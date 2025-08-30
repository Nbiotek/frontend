import { Metadata } from 'next';
import ReviewTestView from './ReviewTestView';

export const metadata: Metadata = {
  title: 'Review Test Results | NBiotek',
  description:
    'Review and analyze patient test results. Examine laboratory reports, provide medical interpretations, approve results, and make clinical decisions based on comprehensive diagnostic data.'
};

const ReviewTestPage = () => {
  return <ReviewTestView />;
};

export default ReviewTestPage;
