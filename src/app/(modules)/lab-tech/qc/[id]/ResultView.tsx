'use client';
import Button from '@/atoms/Buttons';
import { Paragraph } from '@/atoms/typographys';
import { ChevronLeft, DownloadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import TestDetailsInfo from '@/components/common/TestDetailsInfo';
import { useFetchTestResultByID } from '@/hooks/labCoord/useFetchTestResByID';
import Link from 'next/link';

interface ITestDetailModalProps {
  id: string;
}

export default function ResultView({ id }: ITestDetailModalProps) {
  const router = useRouter();

  const { data, status } = useFetchTestResultByID(id);

  return (
    <div className="flex w-full flex-col space-y-4">
      {status === 'pending' && (
        <>
          <div className="flex h-24 w-full animate-pulse flex-col space-y-1 rounded-lg bg-neutral-75 p-4"></div>
          <div className="flex h-80 w-full animate-pulse flex-col space-y-1 rounded-lg bg-neutral-75 p-4"></div>
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
            {data?.resultLink && data.resultLink && (
              <Link href={data.resultLink} target="_blank">
                <Button
                  leftIcon={<DownloadIcon size={18} />}
                  variant="outlined"
                  text="Download Result"
                />
              </Link>
            )}
          </div>
        </>
      )}
      {status === 'error' && <>error getting test!</>}
    </div>
  );
}
