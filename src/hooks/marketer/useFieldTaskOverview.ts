// hooks/marketer/useFieldTask.ts
import { useQuery } from '@tanstack/react-query';
import { fieldTaskServices, FieldTaskFilterParams } from '@/requests/marketer';

export const useFieldTaskOverview = (filterParams?: FieldTaskFilterParams) => {
  return useQuery<TFieldTestRespones>({
    queryKey: ['fieldTask-overview', filterParams],
    queryFn: () => fieldTaskServices.getFIeldTaskOverview(filterParams),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
