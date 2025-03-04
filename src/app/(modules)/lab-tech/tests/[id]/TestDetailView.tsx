'use client';
import Button from '@/atoms/Buttons';
import Status, { EnumTestStatus } from '@/atoms/Buttons/Status';
import FieldSet from '@/atoms/fields/FieldSet';
import { Paragraph } from '@/atoms/typographys';
import { useFetchTestByID } from '@/hooks/labTech/useFetchTestByID';
import { useStore } from '@/store';
import { AppModals } from '@/store/AppConfig/appModalTypes';
import { format } from 'date-fns';
import { ChevronLeft, Eye, Play, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
            className="flex items-center justify-start space-x-2"
          >
            <ChevronLeft />
            <Paragraph text="Back" />
          </button>
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-white p-4">
            <Paragraph className="text-lg !font-medium" text="Patient Information" />

            <div className="flex w-full flex-col space-y-1 ">
              <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                <FieldSet legend="Name" text={data?.patient.name} />
                <FieldSet legend="Email" text={data?.patient.email || 'Nill'} />
                <FieldSet legend="Gender" text={data?.patient.gender || 'Nill'} />
              </div>

              <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                <FieldSet legend="Date of Birth" text={data?.patient.dateOfBirth || 'Nill'} />
                <FieldSet legend="Age" text={data?.patient.age.toString() || 'Nill'} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col space-y-2 rounded-lg bg-white p-4">
            <Paragraph className="text-lg !font-medium" text="Test Information" />

            <div className="flex w-full flex-col space-y-1 ">
              <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                <FieldSet legend="Name" text={data?.test.name} />
                <FieldSet legend="Type" text={data?.type} />
                <FieldSet legend="Status">
                  <Status variant={data?.status || ''} />
                </FieldSet>
              </div>

              <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                <FieldSet
                  legend="Requested Date"
                  text={format(new Date(data?.createdAt || ''), 'dd MMM, yyyy')}
                />
                <FieldSet
                  legend="Deadline"
                  text={format(new Date(data?.deadlineAt || ''), 'dd MMM, yyyy')}
                />
                <FieldSet legend="Note" text={data?.notes || ''} />
              </div>

              <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
                <FieldSet legend="Description" text={data?.test.description || ''} />
              </div>
            </div>
          </div>

          <div className="flex w-fit items-center justify-start space-x-2">
            {data?.status === EnumTestStatus.PENDING && (
              <Button className="w-32" variant="filled" leftIcon={<Play />} text="Start Test" />
            )}

            {data?.status === EnumTestStatus.IN_PROGRESS && (
              <Button
                className="w-32"
                variant="filled"
                leftIcon={<Upload />}
                text="Upload Result"
                onClick={() =>
                  toggleModals({
                    open: true,
                    name: AppModals.RESULT_UPLOAD_MODAL,
                    test_uuid: data.test.id
                  })
                }
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
