import Status from '@/atoms/Buttons/Status';
import FieldSet from '@/atoms/fields/FieldSet';
import { Paragraph } from '@/atoms/typographys';
import { format } from 'date-fns';
import React from 'react';

interface ITestDetailsInfoProps {
  data?: TSingleTestDetail;
}

const TestDetailsInfo = ({ data }: ITestDetailsInfoProps) => {
  return (
    <>
      <div className="flex w-full flex-col space-y-2 rounded-lg bg-white p-4">
        <Paragraph className="text-lg !font-medium" text="Patient Information" />

        <div className="flex w-full flex-col space-y-1 ">
          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            <FieldSet legend="Name" text={data?.patient?.name} />
            <FieldSet legend="Email" text={data?.patient?.email || 'Nill'} />
            <FieldSet legend="Gender" text={data?.patient?.gender || 'Nill'} />
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            <FieldSet legend="Date of Birth" text={data?.patient?.dateOfBirth || 'Nill'} />
            <FieldSet
              legend="Age"
              text={data?.patient?.age ? data?.patient.age.toString() : 'Nill'}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-2 rounded-lg bg-white p-4">
        <Paragraph className="text-lg !font-medium" text="Test Information" />

        <div className="flex w-full flex-col space-y-1 ">
          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            <FieldSet legend="Name" text={data?.test.name} />
            <FieldSet legend="Type" text={data?.type} />
            <FieldSet legend="Priority">
              <Status variant={data?.priority || ''} />
            </FieldSet>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            <FieldSet legend="Status">
              <Status variant={data?.status || ''} />
            </FieldSet>
            <FieldSet
              legend="Requested Date"
              text={format(new Date(data?.createdAt || ''), 'dd MMM, yyyy')}
            />
            <FieldSet
              legend="Deadline"
              text={format(new Date(data?.deadlineAt || ''), 'dd MMM, yyyy')}
            />
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            <FieldSet legend="Note" text={data?.notes || ''} />
            <FieldSet legend="Description" text={data?.test.description || ''} />
          </div>
        </div>
      </div>

      {data?.results && (
        <div className="flex w-full flex-col space-y-2 rounded-lg bg-white p-4">
          <div>
            <Paragraph className="text-lg !font-medium" text="Test Result" />
          </div>

          <div className="flex w-full flex-col space-y-1 ">
            {data.results.map((result, id) => {
              return (
                <div
                  key={id}
                  className="flex w-full flex-col items-start justify-between gap-2 md:flex-row"
                >
                  <FieldSet legend="Parameter" text={result.parameter} />
                  <FieldSet legend="Result" text={result.result} />
                  <FieldSet legend="Unit" text={result.unit} />
                  <FieldSet legend="Reference" text={result.reference} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TestDetailsInfo;
