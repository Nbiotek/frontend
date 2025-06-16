import { MimeTypes } from './mime';

export const MAX_IMAGE_UPLOAD_SIZE = 1024 * 1024 * 10; // 4MB
export const IMAGE_FILE_TYPES = [
  MimeTypes['.png'],
  MimeTypes['.jpeg'],
  MimeTypes['.gif'],
  MimeTypes['.jpg']
];

export const MAX_VIDEO_UPLOAD_SIZE = 1024 * 1024 * 10; // 10MB
export const VIDEO_FILE_TYPES = [MimeTypes['.mp4'], MimeTypes['.mkv'], MimeTypes['.mov']];

export const MAX_PDF_UPLOAD_SIZE = 1024 * 1024 * 15; // 15MB
export const PDF_FILE_TYPES = [MimeTypes['.pdf']];

export const videoAcceptTypes = '.mp4, .avi, .mov, .mkv, .webm|video/*';
export const imageAcceptTypes = '.jpg, .png, .jpeg, .gif|image/*';

export const mediaAcceptTypes =
  '.jpg, .png, .jpeg, .gif|image/*, .mp4, .avi, .mov, .mkv, .webm|video/*';
