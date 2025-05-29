'use client';
import { useFetchUsers } from '@/hooks/admin/useFetchUsers';
import { columns } from './components/columns';
import { UsersTable } from './components/UserTable';
import { useStore } from '@/store';
import { useEffect, useState } from 'react';

const UserManagementView = () => {
  const [data, setData] = useState<Array<TAdminUsersItem>>([]);
  const {
    AdminStore: { setLimit, setPage, queries }
  } = useStore();
  const { data: userData, isLoading } = useFetchUsers(queries.USERS);

  useEffect(() => {
    if (!isLoading && userData !== undefined) {
      setData(userData);
    }
  }, [isLoading, userData]);

  return (
    <div className="w-full">
      <UsersTable {...{ data, isLoading, columns }} />
    </div>
  );
};

export default UserManagementView;
