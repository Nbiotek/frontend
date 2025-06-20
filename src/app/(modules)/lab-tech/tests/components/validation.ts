import { MimeTypes } from '@/constants/mime';
import { z } from 'zod';
import {
  IMAGE_FILE_TYPES,
  MAX_IMAGE_UPLOAD_SIZE,
  MAX_VIDEO_UPLOAD_SIZE,
  VIDEO_FILE_TYPES
} from '@/constants';

export const fileSchema = z.instanceof(File).superRefine((file, ctx) => {
  if (file.size === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please upload a file'
    });
    return;
  }
  const allowedTypes = [...IMAGE_FILE_TYPES, ...VIDEO_FILE_TYPES];

  if (!allowedTypes.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please upload an image or video file'
    });
    return;
  }

  const maxSizeInBytes = {
    image: MAX_IMAGE_UPLOAD_SIZE,
    video: MAX_VIDEO_UPLOAD_SIZE
  };

  let maxSize = maxSizeInBytes.image;
  let fileTypeLabel;

  if (file.type.startsWith('image/')) {
    maxSize = maxSizeInBytes.image;
    fileTypeLabel = 'Image';
  } else if (file.type.startsWith('video/')) {
    maxSize = maxSizeInBytes.video;
    fileTypeLabel = 'Video';
  }

  if (file.size > maxSize) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${fileTypeLabel} file must be smaller than ${fileTypeLabel === 'Image' ? MAX_IMAGE_UPLOAD_SIZE : MAX_VIDEO_UPLOAD_SIZE} bytes`
    });
  }
});

export const fileObjectSchema = z.object({
  file: z.string(),
  mime_type: z.string(),
  bucket: z.string(),
  uuid: z.string()
});

export const mediaFileSchema = z.object({
  file: z.union([fileSchema, fileObjectSchema])
});

export const MAX_IMAGE_UPLOAD_SIZE = 1024 * 1024 * 10; // 4MB
export const IMAGE_FILE_TYPES = [
  MimeTypes['.png'],
  MimeTypes['.jpeg'],
  MimeTypes['.gif'],
  MimeTypes['.jpg']
];

export const fileObjectSchema = z.object({
  id: z.number(),
  file: z.string(),
  mime_type: z.string(),
  bucket: z.string(),
  uuid: z.string()
});

export const fileSchema = z.instanceof(File).superRefine((file, ctx) => {
  if (file.size === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please upload a file'
    });
    return;
  }
  const allowedTypes = [...IMAGE_FILE_TYPES];

  if (!allowedTypes.includes(file.type)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please upload an image file'
    });
    return;
  }

  const maxSizeInMB = {
    image: MAX_IMAGE_UPLOAD_SIZE
  };

  let maxSize = maxSizeInMB.image;
  let fileTypeLabel;

  if (file.type.startsWith('image/')) {
    maxSize = maxSizeInMB.image * 1024 * 1024;
    fileTypeLabel = 'Image';
  }

  if (file.size > maxSize) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${fileTypeLabel} file must be smaller than ${maxSizeInMB['image']}MB`
    });
  }
});

export const testResultsSchema = z.object({
  //   media: z.array(
  //   z.object({
  //     file: z.union([fileSchema, fileObjectSchema])
  //   })
  // )
  data: z
    .object({
      parameter: z.string(),
      result: z.string(),
      range: z.string(),
      unit: z.string(),
      reference: z.string()
    })
    .array(),

  media: z.array(mediaFileSchema)
});

export type TTestResultsTypeSchema = z.infer<typeof testResultsSchema>;
export type TRemoteFile = z.infer<typeof fileObjectSchema>;
export type TFileUploadSchema = z.infer<typeof fileSchema>;
export type TMediaFileSchema = z.infer<typeof mediaFileSchema>;
