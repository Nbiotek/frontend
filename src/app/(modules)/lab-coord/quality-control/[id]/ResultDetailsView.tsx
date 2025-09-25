'use client';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { ChevronLeft, DownloadIcon, ShieldCheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TestDetailsInfo from '@/components/common/TestDetailsInfo';
import { useFetchTestResultByID } from '@/hooks/labCoord/useFetchTestResByID';
import { EnumResultStatus } from '@/atoms/Buttons/Status';
import Link from 'next/link';
import { useUpdateQCStatus } from '@/hooks/labCoord/useUpdateQCStatus';

interface ITestDetailModalProps {
  id: string;
}

export default function ResultView({ id }: ITestDetailModalProps) {
  const router = useRouter();
  const {
    AppConfigStore: { toggleModals }
  } = useStore();

  const { data, status } = useFetchTestResultByID(id);
  const { mutate: qcStatusMutate } = useUpdateQCStatus();

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

          <TestDetailsInfo data={data} />

          <div className="flex w-full items-center justify-start space-x-3">
            {data?.qcStatus && data.qcStatus === EnumResultStatus.PENDING && (
              <div>
                <Button
                  leftIcon={<ShieldCheckIcon size={18} />}
                  variant="filled"
                  text="Start Review"
                  onClick={() =>
                    qcStatusMutate({
                      payload: { status: EnumResultStatus.UNDER_REVIEW },
                      id: id
                    })
                  }
                />
              </div>
            )}
            {data?.qcStatus && data.qcStatus === EnumResultStatus.UNDER_REVIEW && (
              <div>
                <Button
                  leftIcon={<ShieldCheckIcon size={18} />}
                  variant="filled"
                  text="Review Test"
                  onClick={() => {
                    toggleModals({
                      open: true,
                      name: AppModals.QC_STATUS_UPDATE,
                      testId: id,
                      currentStatus: EnumResultStatus.UNDER_REVIEW
                    });
                  }}
                />
              </div>
            )}
            {data?.resultLink && data.resultLink && (
              <Link href={data.resultLink} target="_blank">
                <Button
                  leftIcon={<DownloadIcon size={18} />}
                  variant="outlined"
                  text="Download Result"
                />
              </Link>
            )}

            {data?.wantDoctorRecommendation == 'yes' && data?.doctor === null && (
              <Button
                variant="filled"
                text="Assign Doctor"
                onClick={() => {
                  toggleModals({
                    name: AppModals.AVAILABLE_DOCTORS,
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
}
