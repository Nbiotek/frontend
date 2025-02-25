type TLabTechDashboardRes = {
  totalPendingTests: number;
  totalCompletedTests: number;
  averageTurnaroundTime: number;
  totalMessages: number;
  recentTests: [];
};

type TTestType = {
  id: number;
  patientName: string;
  testType: string;
  requestDate: string;
  deadline: string;
  priority: string;
};

type TLabTechRecentActivitesRes = {
  data: Array<TTestType>;
};

// ============ Results ========================
type TRecentResultQuery = {
  search: string;
  status: string;
  fromDate: string;
  toDate: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
};

type TTestResults = {
  id: string;
  patientName: string;
  testType: string;
  requestedDate: string;
  completedDate: string;
  status: string;
};

type TRecentTestResults = {
  results: Array<TTestResults>;
  pagination: TPaginationResponse;
};
