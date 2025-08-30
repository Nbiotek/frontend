import { Metadata } from 'next';
import TestResulView from './TestResultView';

export const metadata: Metadata = {
  title: 'Test Results | NBiotek',
  description:
    'View and manage your medical test results. Access detailed lab reports, download documents, and track your health progress with comprehensive result history and analysis.'
};

export default function TestResultPage() {
  return <TestResulView />;
}
