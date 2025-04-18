import { LAB_TECH, QUALITY_CONTROL } from '@/constants/api';
import server from '.';
import { getAllParams } from '@/utils';
import { EnumTestStatus } from '@/atoms/Buttons/Status';

// put requests
export type TTestStatusMutateParams = {
  id: string;
  payload: {
    status: EnumTestStatus;
  };
};

export const putUpdateTestStatus = async (args: TTestStatusMutateParams) => {
  const { id, payload } = args;
  server.put<INBTServerResp<string>>(LAB_TECH.UPDATE_TEST_STATUS.replace(':id', id), payload);
};

// get requests
export const getLabTechDashboard = async () =>
  server.get<INBTServerResp<TLabTechDashboardRes>>(LAB_TECH.DASHBOARD);

// Results
export const getRecentResult = async ({
  search,
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  page,
  limit = 10
}: Partial<TTestQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TRecentTestResults>>(LAB_TECH.RECENT_RESULTS, { params });
};

export const getArchivedResult = async ({
  search,
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  page,
  limit = 10
}: Partial<TTestQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TRecentTestResults>>(LAB_TECH.ARCHIVED_RESULTS, { params });
};

// Quality control
export const getPendingQC = async ({
  search,
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  page,
  limit = 10
}: Partial<TTestQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TQCTestResp>>(QUALITY_CONTROL.PENDING, { params });
};

export const getHistoryQC = async ({
  search,
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  page,
  limit = 10
}: Partial<TTestQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TQCTestResp>>(LAB_TECH.HISTORY_QC, { params });
};

// put request
export const putAvailablity = (payload: { status: string }) =>
  server.put<INBTServerResp<TAvailabiltyData>>(LAB_TECH.UPADTE_AVAILABILITY, payload);
