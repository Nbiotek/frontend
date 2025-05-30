type TAdminUsersItem = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminUsersResp = {
  formatted: Array<TAdminUsersItem>;
  pagination: TPaginationResponse;
};
