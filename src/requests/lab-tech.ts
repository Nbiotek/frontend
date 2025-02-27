import { LAB_TECH } from '@/constants/api';
import server from '.';
import { getAllParams } from '@/utils';

// post requests
export const postUploadResult = async (id: string) =>
  server.post(LAB_TECH.RESULT_UPLOAD.replaceAll(':id', id));

// get requests
export const getLabTechDashboard = async () =>
  server.get<INBTServerResp<TLabTechDashboardRes>>(LAB_TECH.DASHBOARD);

export const getRecentActivities = async () =>
  server.get<TLabTechRecentActivitesRes>(LAB_TECH.RECENT_ACTIVITIES);

export const getTest = async (id: string) => server.get(LAB_TECH.GET_TEST.replaceAll(':id', id));

export const getRecentResult = async ({
  search,
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  page,
  limit = 10
}: Partial<TRecentResultQuery>) => {
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
}: Partial<TRecentResultQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TRecentTestResults>>(LAB_TECH.ARCHIVED_RESULTS, { params });
};

export const getPendingQC = async ({
  search,
  status,
  fromDate,
  toDate,
  sortBy,
  sortOrder,
  page,
  limit = 10
}: Partial<TRecentResultQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TQCTestResp>>(LAB_TECH.ARCHIVED_RESULTS, { params });
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
}: Partial<TRecentResultQuery>) => {
  const params = getAllParams({ search, status, fromDate, toDate, sortBy, sortOrder, page, limit });

  return server.get<INBTServerResp<TQCTestResp>>(LAB_TECH.HISTORY_QC, { params });
};
