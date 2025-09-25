'use client';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { useFetchTestByID } from '@/hooks/labCoord/useFetchTestByID';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TestDetailsInfo from '@/components/common/TestDetailsInfo';
import { EnumTestLocation } from '@/constants/mangle';

interface ITestDetailModalProps {
  id: string;
}

const TestDetailModal = ({ id }: ITestDetailModalProps) => {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, status } = useFetchTestByID(id);

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
            className="flex w-fit items-center justify-start space-x-2"
          >
            <ChevronLeft />
            <Paragraph text="Back" />
          </button>

          <TestDetailsInfo data={data} />

          <div className="grid w-full grid-cols-button gap-2">
            {data?.location.type === EnumTestLocation.CUSTOM && data?.marketer === null && (
              <Button
                variant="filled"
                text="Assign Marketer"
                onClick={() => {
                  toggleModals({
                    name: AppModals.AVAILABLE_MARKETERS,
                    open: true,
                    testId: data?.id ?? ''
                  });
                }}
              />
            )}

            {data?.technician && data.technician.id ? null : (
              <Button
                variant="filled"
                text="Assign Technician"
                onClick={() => {
                  toggleModals({
                    name: AppModals.AVAILABLE_TECHNICIANS,
                    open: true,
                    testId: data?.id ?? ''
                  });
                }}
              />
            )}
          </div>
        </>
      )}
      {status === 'error' && <>error getting test!</>}
    </div>
  );
};

export default TestDetailModal;
