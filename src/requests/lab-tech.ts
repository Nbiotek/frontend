import { LAB_TECH } from '@/constants/api';
import server from '.';

// post requests
export const postUploadResult = async (id: string) =>
  server.post(LAB_TECH.RESULT_UPLOAD.replaceAll(':id', id));

// get requests
export const getLabTechDashboard = async () => server.get<TLabTechDashboardRes>(LAB_TECH.DASHBOARD);

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
  const params: Record<string, any> = { limit };

  if (search) {
    params.search = search;
  }

  if (status) {
    params.status = status;
  }

  if (fromDate) {
    params.fromDate = fromDate;
  }

  if (toDate) {
    params.toDate = toDate;
  }

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (sortOrder) {
    params.sortOrder = sortOrder;
  }

  if (page) {
    params.page = page;
  }

  return server.get<INBTServerResp<TRecentTestResults>>(LAB_TECH.RECENT_RESULTS, { params });
};
