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

type TAdminDashboardStats = {
  totalUsers: number;
  totalPackages: number;
  totalLabTestRequests: number;
  totalTestResults: number;
  superAdmin: number;
  doctor: number;
  referralDoctor: number;
  patient: number;
  labCoordinator: number;
  labTechnician: number;
  receptionist: number;
  marketer: number;
  technicalCoordinator: number;
};
