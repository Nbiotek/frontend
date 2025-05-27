'use client';
import { columns } from './components/columns';
import { userListSchema } from './components/data/schema';
import { users } from './components/data/users';
import { UsersTable } from './components/UserTable';

const UserManagementView = () => {
  const userList = userListSchema.parse(users);
  return (
    <div className="w-full">
      <UsersTable {...{ data: userList, columns }} />
    </div>
  );
};

export default UserManagementView;
