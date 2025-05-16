import { uploadFile } from '@/requests/file-upload';

import { useMutation } from '@tanstack/react-query';

export const useFileUpload = () => {
  return useMutation({
    mutationFn: (file: File[]) => uploadFile(file),
    onSuccess: (data) => {
      console.log('File uploaded successfully', data);
    }
  });
};
