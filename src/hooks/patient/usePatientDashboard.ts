import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  PatientDashboardService,
  PatientInfoService,
  PatientRecentResult
} from '@/requests/patient';

export const usePatientDashboard = () => {
  return useQuery<TPatientDashboard>({
    queryKey: ['patient-dashboard'],
    queryFn: PatientDashboardService
  });
};

export const usePatientInfo = () => {
  return useQuery<InfoApiResponse>({
    queryKey: ['patient-info'],
    queryFn: PatientInfoService
  });
};

export const usePatientRecentResult = () => {
  return useQuery<TPatientRecentTest>({
    queryKey: ['recent-result'],
    queryFn: PatientRecentResult
  });
};
