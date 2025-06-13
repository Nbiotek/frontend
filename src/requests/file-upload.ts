import server from '.';

export const uploadFile = async (files: File[]) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append('files', file);
  }

  const response = await server.post('file-manager/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
