import { Metadata } from 'next';
import TestSuiteView from './TestSuiteView';

export const metadata: Metadata = {
  title: 'Test Suite Results | NBiotek',
  description:
    'View detailed results for your test suite. Access comprehensive analysis, individual test components, and downloadable reports for your complete laboratory test suite.'
};

export default function AllTestItemSuite() {
  return <TestSuiteView />;
}
