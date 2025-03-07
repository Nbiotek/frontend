import { LAB_TECH } from '@/constants/api';
import server from '.';
import { TTestResultsTypeSchema } from '@/app/(modules)/lab-tech/tests/components/validation';

// post requests
export const postUploadResult = async (testRequestId: string, result: TTestResultsTypeSchema) =>
  server.post(LAB_TECH.RESULT_UPLOAD.replaceAll(':id', testRequestId), {
    testRequestId,
    data: result.data
  });
