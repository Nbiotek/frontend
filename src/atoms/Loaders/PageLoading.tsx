import { CircleLoader } from 'react-spinners';
import { Paragraph } from '../typographys';

const PageLoading = () => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-full flex-col items-center justify-center space-y-2 bg-white">
      <CircleLoader size={20} color="#0a30d9" />
      <Paragraph className="!font-medium" text="Nbiotek" />
    </div>
  );
};

export default PageLoading;
