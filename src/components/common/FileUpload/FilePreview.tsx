'use client';
import { forwardRef } from 'react';
import {
  TTestResultsTypeSchema,
  TRemoteFile
} from '@/app/(modules)/lab-tech/tests/components/validation';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '@/store';
import { IMAGE_FILE_TYPES } from '@/constants';
import { delMediaFile, postUploadedFile } from '@/requests/upload';
import ProgressBar from '@/components/common/Progress';
import { Toast } from '@/atoms/Toast';
import VideoPlayer from '@/components/common/VideoPlayer';
import { GoX } from 'react-icons/go';
import { computeSHA256 } from '@/utils/media';
import { deleteFromBucket, getSignedURL } from './actions';
import axios from 'axios';
import { env } from '@/env';

interface IFilePreviewProps {
  file: TTestResultsTypeSchema['media'][number]['file'];
  id: string;
  idx: number;
  bucket: string;
  update: (index: number, remoteFile: TRemoteFile) => void;
  remove: (index: number, media_uuid?: string) => void;
  error?: string;
  onImageLoad?: () => void; // added callback prop
}

interface IFileObj extends TRemoteFile {
  file_name: string;
  file_size: number;
  type: 'image' | 'video';
  uuid: string;
}

const FilePreview = forwardRef<HTMLDivElement, IFilePreviewProps>(
  ({ file, update, idx, remove, bucket, onImageLoad }, ref) => {
    const [preview, setPreview] = useState<IFileObj | null>(null);
    const [isLocal, setIsLocal] = useState<boolean>(file instanceof File);
    const uploading = useRef(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const {
      AuthStore: { decodedToken }
    } = useStore();

    useEffect(() => {
      async function handleFile() {
        if (!isLocal) {
          const remoteFile = file as TRemoteFile;
          setPreview({
            bucket,
            file_name: remoteFile?.file?.split('/').pop() ?? '',
            file_size: 0,
            mime_type: remoteFile.mime_type,
            type: IMAGE_FILE_TYPES.includes(remoteFile.mime_type) ? 'image' : 'video',
            file: remoteFile.file,
            uuid: remoteFile.uuid
          });
          return;
        }

        if (uploading.current) return;

        uploading.current = true;
        const _file = file as File;
        setPreview({
          bucket,
          file_name: _file.name,
          file_size: _file.size,
          mime_type: _file.type,
          type: IMAGE_FILE_TYPES.includes(_file.type) ? 'image' : 'video',
          file: URL.createObjectURL(_file),
          uuid: ''
        });

        if (!decodedToken) {
          uploading.current = false;
          return;
        }

        const checksum = await computeSHA256(_file);

        const metadata = {
          user_id: decodedToken.uuid.toString(),
          file_type: _file.type,
          file_size: _file.size.toString(),
          handle: decodedToken.business_handle ?? '-',
          duration: '0',
          h: '0',
          w: '0'
        };

        // intitiate upload
        const signedURLRes = await getSignedURL({
          file_name: _file.name,
          file_size: _file.size,
          file_type: _file.type,
          metadata,
          checksum
        });

        if (signedURLRes.failure !== undefined) {
          setError(signedURLRes.failure);
          Toast.error(`${_file.name}: ${signedURLRes.failure}`);
          uploading.current = false;
          return remove(idx);
        }

        const { url, name } = signedURLRes.success;
        try {
          await axios.put(url, _file, {
            headers: {
              'Content-Type': _file.type,
              ...Object.entries(metadata).reduce(
                (acc, [key, value]) => {
                  acc[`x-amz-meta-${key}`] = value;
                  return acc;
                },
                {} as Record<string, string>
              )
            },
            onUploadProgress(progressEvent) {
              const progress = Math.round((progressEvent.loaded * 100) / _file.size);
              setProgress(progress);
            }
          });

          await postUploadedFile({
            bucket,
            checksum,
            file_size: _file.size,
            file_url: env.NEXT_PUBLIC_S3_PUB_LAB_ACCESS_URL.concat(`/${name}`),
            mime_type: _file.type,
            file_name: _file.name
          })
            .then((res) => {
              const data = res?.data?.data;
              if (res.status === 201) {
                const { bucket, mime_type, file_url, uuid } = data;
                update(idx, { bucket, mime_type, file: file_url, uuid });
              } else {
                console.error('Unexpected structure:', res);
                throw new Error('Unexpected response structure.');
              }
            })
            .catch((err) => {
              Toast.error('E401::Error uploading file');
              remove(idx);
            });
        } catch (error: any) {
          setError(error.message);
          Toast.error(`${_file.name}: ${signedURLRes.failure}`);
        } finally {
          uploading.current = false;
        }
      }

      handleFile();
    }, [decodedToken, file, idx, isLocal, remove, update]);

    const handleRemove = async () => {
      if (isLocal) {
        URL.revokeObjectURL(preview?.file ?? '');
      }
      remove(idx, preview?.uuid);
      if (preview?.uuid) {
        await delMediaFile(preview.uuid);
        await deleteFromBucket({ file_name: preview.file_name });
      }
    };

    return (
      <div
        data-bucket={bucket}
        ref={ref}
        className="data-[bucket=catalogue]:max-w-thumbnail group relative block aspect-landscape w-1/6 overflow-hidden rounded-lg data-[bucket=catalogue]:md:w-1/5 data-[bucket=conversation]:md:w-1/6"
      >
        <div className="absolute right-2 top-2 z-20 flex items-center justify-center rounded-full bg-red-300">
          <button
            type="button"
            onClick={handleRemove}
            className="bg-error flex h-full w-full cursor-pointer items-center justify-center rounded-full p-1"
          >
            <GoX className="text-white" />
          </button>
        </div>

        <ProgressBar
          value={!isLocal || error ? 100 : progress}
          className={`absolute top-0 z-10 w-full ${
            error
              ? 'progress-value-error'
              : isLocal && progress < 100
                ? 'progress-value-loading'
                : 'progress-value-done'
          }`}
        />
        {preview?.type === 'image' ? (
          <Image
            src={preview?.file ?? null}
            alt="preview"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full bg-black object-contain"
            onLoadingComplete={() => {
              if (onImageLoad) onImageLoad();
            }}
          />
        ) : (
          <VideoPlayer src={preview?.file ?? null} />
        )}
      </div>
    );
  }
);
FilePreview.displayName = 'FilePreview';
export default FilePreview;
