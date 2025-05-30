'use client';
import { useFetchUsers } from '@/hooks/admin/useFetchUsers';
import { columns } from './components/columns';
import UsersTable from './components/UserTable';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';
import { pagination } from '@/constants/data';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const UserManagementView = () => {
  const [data, setData] = useState<Array<TAdminUsersItem>>([]);
  const [dataPagination, setDataPagination] = useState<TPaginationResponse>(pagination);
  const {
    AdminStore: { queries }
  } = useStore();
  const { data: userData, isLoading } = useFetchUsers(queries.USERS);

  useEffect(() => {
    if (!isLoading && userData !== undefined) {
      setData(userData.formatted);
      setDataPagination(userData.pagination);
    }
  }, [isLoading, userData]);

  return (
    <div className="w-full">
      <UsersTable {...{ data, pagination: dataPagination, isLoading, columns }} />
    </div>
  );
};

export default observer(UserManagementView);
