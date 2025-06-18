import {
  IMAGE_FILE_TYPES,
  MAX_IMAGE_UPLOAD_SIZE,
  MAX_VIDEO_UPLOAD_SIZE,
  VIDEO_FILE_TYPES,
  MEDIA_FILE_TYPES
} from '@/constants';

export const checkValidity = (arg: IGetSignedURLParams) => {
  if (!MEDIA_FILE_TYPES.includes(arg.file_type)) {
    return { error: 'File type not allowed' };
  }

  if (IMAGE_FILE_TYPES.includes(arg.file_type) && arg.file_size > MAX_IMAGE_UPLOAD_SIZE) {
    return { error: 'Image size too large' };
  }

  if (VIDEO_FILE_TYPES.includes(arg.file_type) && arg.file_size > MAX_VIDEO_UPLOAD_SIZE) {
    return { error: 'Video size too large' };
  }

  return { error: null };
};
