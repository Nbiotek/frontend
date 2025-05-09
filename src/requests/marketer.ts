import { start } from 'repl';
import server from '.';
import { MARKETER } from '@/constants/api';

export interface FieldTaskFilterParams {
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export const marketerDashboardService = {
  getDashboardOverview: async () => {
    const { data } = await server.get<TFieldOfficerDashboard>(MARKETER.DASHBOARD);
    return data;
  }
};

export const fieldTaskServices = {
  getFIeldTaskOverview: async (params?: FieldTaskFilterParams) => {
    let url = MARKETER.FIELD_TASK_OVERVIEW;

    if (params && Object.keys(params).length > 0) {
      url = MARKETER.FIELD_TASK_OVERVIEW.split('?')[0];

      const queryParams = new URLSearchParams();

      if (params.fromDate) queryParams.append('fromDate', params.fromDate);
      if (params.toDate) queryParams.append('toDate', params.toDate);
      if (params.status) queryParams.append('status', params.status);

      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }
    }

    const { data } = await server.get<TFieldTestRespones>(url);
    return data;
  },

  getAllFIeldTasks: async () => {
    const { data } = await server.get<TFieldTestRespones>(MARKETER.FIELD_TASK_OVERVIEW);
    return data;
  },

  getFieldVisitById: async (id: string) => {
    const url = MARKETER.SHOW_FIELD_TASK.replace(':id', id);
    const { data } = await server.get<TFieldTaskShowResponse>(url);
    return data;
  },

  getFieldTaskHistory: async () => {
    const { data } = await server.get<TFieldTestRespones>(MARKETER.FIELD_TASK_HISTORY);
    return data;
  },

  startFieldVisit: async (id: string, payload: { status: string }) => {
    const url = MARKETER.LOG_SAMPLES.UPDATE_FIELD_VISIT.replace(':id', id);
    const { data } = await server.put<TFieldTestRespones>(url, payload);
    return data;
  },

  uploadSamples: async (id: string, payload: TSampleCollectionData) => {
    const url = MARKETER.LOG_SAMPLES.UPLOAD.replace(':id', id);
    const { data } = await server.post<TFieldTestRespones>(url, payload);
    return data;
  }
};
