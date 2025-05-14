import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fieldTaskServices, FieldTaskFilterParams } from '@/requests/marketer';

const QUERY_KEYS = {
  allFieldTasks: ['field-tasks'],
  fieldTaskHistory: ['field-task-history'],
  fieldTaskDetails: (id: string) => ['field-task', id]
};

export const useUpdateFieldVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldVisitId, status }: { fieldVisitId: string; status: string }) =>
      fieldTaskServices.startFieldVisit(fieldVisitId, { status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.fieldTaskDetails(variables.fieldVisitId)
      });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allFieldTasks });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.fieldTaskHistory });
    }
  });
};

export const useAllFieldTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.allFieldTasks,
    queryFn: fieldTaskServices.getAllFIeldTasks
  });
};

export const useFieldTaskHistory = () => {
  return useQuery({
    queryKey: QUERY_KEYS.fieldTaskHistory,
    queryFn: fieldTaskServices.getFieldTaskHistory
  });
};

export const useShowFieldTask = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.fieldTaskDetails(id),
    queryFn: () => fieldTaskServices.getFieldVisitById(id)
  });
};

export const useUploadSample = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TSampleCollectionData }) =>
      fieldTaskServices.uploadSamples(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.fieldTaskDetails(variables.id) });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allFieldTasks });

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.fieldTaskHistory });
    }
  });
};
