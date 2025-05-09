// hooks/marketer/useFieldTask.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fieldTaskServices, FieldTaskFilterParams } from '@/requests/marketer';

export const useUpdateFieldVisit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fieldVisitId, status }: { fieldVisitId: string; status: string }) =>
      fieldTaskServices.startFieldVisit(fieldVisitId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['field-visit'] });
    }
  });
};

export const useAllFieldTasks = () => {
  return useQuery<TFieldTestRespones>({
    queryKey: ['allField-visit'],
    queryFn: fieldTaskServices.getAllFIeldTasks
  });
};

export const useFieldTaskHistory = () => {
  return useQuery<TFieldTestRespones>({
    queryKey: ['field-visit-history'],
    queryFn: fieldTaskServices.getFieldTaskHistory
  });
};

export const useShowFieldTask = (id: string) => {
  return useQuery<TFieldTaskShowResponse>({
    queryKey: ['field-visit', id],
    queryFn: () => fieldTaskServices.getFieldVisitById(id)
  });
};
