import { MimeTypes } from './mime';

export const MAX_IMAGE_UPLOAD_SIZE = 1024 * 1024 * 4; // 4MB
export const IMAGE_FILE_TYPES = [MimeTypes['.png'], MimeTypes['.jpeg'], MimeTypes['.jpg']];

export const MAX_VIDEO_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
export const VIDEO_FILE_TYPES = [MimeTypes['.mp4'], MimeTypes['.mkv'], MimeTypes['.mov']];

export const MAX_PDF_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
export const PDF_FILE_TYPES = [MimeTypes['.pdf']];

export const videoAcceptTypes = '.mp4, .avi, .mov, .mkv, .webm';

export const imageAcceptTypes = '.jpg, .png, .jpeg, .gif';

export const mediaAcceptTypes = `${imageAcceptTypes}, ${videoAcceptTypes}`;

export const MEDIA_FILE_TYPES = [...VIDEO_FILE_TYPES, ...IMAGE_FILE_TYPES];
