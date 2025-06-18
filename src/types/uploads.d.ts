type IGetSignedURLParams = {
  file_type: string;
  file_size: number;
  checksum: string;
  file_name: string;
  metadata: FileMetadata;
};

type FileMetadata = {
  [key: string]: string;
  user_id: string;
  file_type: string;
  file_size: string;
  handle: string;
  w: string;
  h: string;
  duration: string;
};
