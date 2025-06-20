'use server';
import { env } from '@/env';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import _ from 'lodash';
import { checkValidity } from './validation';
import { getTransformedFileName } from '@/utils/media';
import { IMAGE_FILE_TYPES } from '@/constants';

const S3 = new S3Client({
  region: 'auto',
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED'
});

type SignedURLResponseData =
  | { failure?: undefined; success: { url: string; name: string } }
  | { failure: string; success?: undefined };

export async function getSignedURL({
  checksum,
  file_name,
  ...rest
}: IGetSignedURLParams): Promise<SignedURLResponseData> {
  const { error } = checkValidity({ file_name, checksum, ...rest });

  if (error != null) return { failure: error };

  const transformedFileName = getTransformedFileName(file_name, rest.metadata.user_id);

  try {
    const putObjectCommand = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_LAB_BUCKET_NAME,
      Key: transformedFileName,
      ContentType: rest.file_type,
      ContentLength: rest.file_size,
      ChecksumSHA256: checksum,
      Metadata: rest.metadata
    });

    const url = await getSignedUrl(S3, putObjectCommand, {
      expiresIn: IMAGE_FILE_TYPES.includes(rest.file_type) ? 60 * 5 : 60 * 30, // 5 minutes for images, 30 minutes for others
      unhoistableHeaders: new Set(Object.keys(rest.metadata).map((k) => `x-amz-meta-${k}`))
    });

    return { success: { url, name: transformedFileName } };
  } catch (error: any) {
    return { failure: error.message };
  } finally {
    console.timeEnd('getSignedURL');
  }
}

export async function deleteFromBucket({
  file_name
}: {
  file_name: string;
}): Promise<{ success?: string; failure?: string }> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_LAB_BUCKET_NAME,
      Key: file_name
    });

    await S3.send(command);

    return { success: `${file_name} deleted successfully.` };
  } catch (error: any) {
    return { failure: error.message };
  }
}
