import React from 'react';
import Image from 'next/image';
import Status from '@/atoms/Buttons/Status';
import FieldSet from '@/atoms/fields/FieldSet';
import { Paragraph } from '@/atoms/typographys';
import { IMAGE_FILE_TYPES } from '@/constants';
import { dateTimeUTC } from '@/utils/date';
import { format } from 'date-fns';
import VideoPlayer from './VideoPlayer';
import EmptyState from '../EmptyState';

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
            <FieldSet
              legend="Date of Birth"
              text={
                data?.patient?.dateOfBirth ? dateTimeUTC(data?.patient?.dateOfBirth, false) : 'Nill'
              }
            />
            <FieldSet
              legend="Age"
              text={data?.patient?.age ? `${data?.patient.age.toString()} years` : 'Nill'}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-2 rounded-lg bg-white p-4">
        <Paragraph className="text-lg !font-medium" text="Test Information" />

        <div className="flex w-full flex-col space-y-1 ">
          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            <FieldSet legend="Name" text={data?.test.name} />
            <FieldSet legend="Type">
              <Status variant={data?.type || ''} />
            </FieldSet>
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
              text={data?.createdAt ? format(new Date(data?.createdAt), 'MMM dd, yyyy') : ''}
            />
            <FieldSet
              legend="Deadline"
              text={data?.deadlineAt ? format(new Date(data?.deadlineAt), 'MMM dd, yyyy') : ''}
            />
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
            {data?.qcStatus && (
              <FieldSet legend="QC Status">
                <Status variant={data.qcStatus} />
              </FieldSet>
            )}
            {data?.qcReason && <FieldSet legend="QC Reason" text={data.qcReason} />}
            <FieldSet legend="Note" text={data?.notes || ''} />
            <FieldSet legend="Description" text={data?.test.description || ''} />
          </div>
        </div>
      </div>

      {data?.marketer?.name ? (
        <div className="flex flex-col space-y-3 rounded-lg bg-white p-4">
          <Paragraph className="text-lg !font-medium" text="Marketer Reports" />
          {data?.logSamples && (
            <div className="flex w-full flex-col space-y-2">
              <div>
                <Paragraph className="text-lg !font-medium" text="Sample logs" />
              </div>
              <div className="flex w-full flex-col space-y-1 ">
                {data.logSamples.length === 0 ? (
                  <EmptyState title="No media data." />
                ) : (
                  data.logSamples.map((logs, id) => {
                    return (
                      <div key={id} className="flex space-x-[24px] font-medium">
                        <FieldSet legend="Sample Type" text={logs.sampleType} />
                        <FieldSet legend="Required Amount" text={logs.requiredAmount} />
                        <FieldSet legend="created At" text={dateTimeUTC(logs.createdAt, true)} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
          {data?.samplePhotos && (
            <div className="flex w-full flex-col space-y-2">
              <div>
                <Paragraph className="text-lg !font-medium" text="sample uploads" />
              </div>

              <div className="grid grid-cols-response gap-2">
                {data.samplePhotos.length === 0 ? (
                  <EmptyState title="No media data." />
                ) : (
                  data.samplePhotos.map((sample, id) => {
                    return (
                      <div
                        key={id}
                        className="group relative block aspect-landscape overflow-hidden rounded-lg"
                      >
                        <Image
                          src={sample.url}
                          alt="preview"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full bg-black object-contain"
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}

      <div className="flex flex-col space-y-3 rounded-lg bg-white p-4">
        <Paragraph className="text-lg !font-medium" text="Lab Technician Reports" />
        {data?.results && (
          <div className="flex w-full flex-col space-y-2">
            <div>
              <Paragraph className="text-lg !font-medium" text="Result" />
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

        {data?.media && (
          <div className="flex w-full flex-col space-y-2">
            <div>
              <Paragraph className="text-lg !font-medium" text="Uploads" />
            </div>

            <div className="grid grid-cols-response gap-2">
              {data.media.length === 0 ? (
                <EmptyState title="No media data." />
              ) : (
                data.media.map((media, id) => {
                  return (
                    <div
                      key={id}
                      className="group relative block aspect-landscape overflow-hidden rounded-lg"
                    >
                      {IMAGE_FILE_TYPES.includes(media.mime_type) ? (
                        <Image
                          src={media.file_url}
                          alt="preview"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full bg-black object-contain"
                        />
                      ) : (
                        <VideoPlayer src={media.file_url} />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestDetailsInfo;
