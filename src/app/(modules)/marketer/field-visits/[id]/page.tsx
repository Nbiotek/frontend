import { Metadata } from 'next';
import UploadSampleView from './UploadSampleView';

export const metadata: Metadata = {
  title: 'Field Visit Sample Upload | NBiotek',
  description:
    'Upload and manage samples from field visits. Document sample collection, upload images, track sample information, and coordinate laboratory processing for field marketing activities.'
};

const UploadSamplePage = () => {
  return <UploadSampleView />;
};

export default UploadSamplePage;
