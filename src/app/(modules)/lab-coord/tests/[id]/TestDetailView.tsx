'use client';
import Button from '@/atoms/Buttons';
import { EnumTestStatus } from '@/atoms/Buttons/Status';
import { Paragraph } from '@/atoms/typographys';
import { useFetchTestByID } from '@/hooks/labCoord/useFetchTestByID';
import { useUpdateTestStatus } from '@/hooks/labTech/useUpdateTestStatus';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { ChevronLeft, Pause, Play, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TestDetailsInfo from './TestDetailsInfo';
import AvailableTechnicians from '@/app/(modules)/components/AvailableTechnicians';

interface ITestDetailModalProps {
  id: string;
}

const TestDetailModal = ({ id }: ITestDetailModalProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, status } = useFetchTestByID(id);
  const { mutateTestStatus, isPending } = useUpdateTestStatus();

  return (
    <div className="flex w-full flex-col space-y-4">
      {status === 'pending' && (
        <>
          <div className="flex h-24 w-full animate-pulse flex-col space-y-1 rounded-lg bg-neutral-75 p-4"></div>
          <div className="flex h-80 w-full animate-pulse flex-col space-y-1 rounded-lg bg-neutral-75 p-4"></div>
        </>
      )}
      {status === 'success' && (
        <>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-start space-x-2"
          >
            <ChevronLeft />
            <Paragraph text="Back" />
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-start lg:space-x-4">
            <div className="w-full lg:w-[75%]">
              <TestDetailsInfo data={data} />
            </div>
            <div className="h-fit w-full overflow-clip rounded-lg bg-white lg:w-[25%]">
              <AvailableTechnicians />
            </div>
          </div>
        </>
      )}
      {status === 'error' && <>error getting test!</>}
    </div>
  );
};

export default TestDetailModal;
