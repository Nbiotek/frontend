import { useCallback } from 'react';
import { qualityControl } from './FetchkeyFactory';
import { useQuery } from '@tanstack/react-query';
import { toJS } from 'mobx';

const select = (resp: INBTServerResp<TQCTestResp>) => resp.data;

export function useFetchHistoryQC(
  query: Partial<TTestQuery>
): IQueryHookResponse<TQCTestResp | undefined> {
  console.log(toJS(query));
  const meta = qualityControl.getHistory(query);
  const memoizedSelect = useCallback(select, []);

  const { data, status, error, isLoading } = useQuery({
    queryKey: meta.keys(),
    meta,
    select: memoizedSelect
  });

  return { data, status, error, isLoading };
}
