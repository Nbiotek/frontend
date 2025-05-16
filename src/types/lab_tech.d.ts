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

// =========== Tests ===============
type TTestData = {
  id: string;
  patientName: string;
  testName: string;
  testType: string;
  type: string;
  status: string;
  priority: string;
  preferredAt: string;
  deadlineAt: string;
  completedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  resultStatus: string;
  technician: {
    id: string;
    name: string;
  } | null;
  qcStatus?: string;
  location: {
    type: string;
    address: string;
  };
  marketer: {
    id: string;
    name: string;
  } | null;
};

type TTestQuesRes = INBTPaginatedData<TTestData>;

type TTestDetailsPatient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  age: number;
};

type TTestResultData = {
  parameter: string;
  result: string;
  range: string;
  unit: string;
  reference: string;
};

type TSingleTestDetail = {
  id: string;
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    age: number;
  };
  test: {
    id: string;
    name: string;
    category: string;
    description: string;
  };
  package?: string;
  type: string;
  status: string;
  priority: string;
  preferredAt: string;
  deadlineAt: string;
  completedAt?: string;
  notes?: string;
  technician?: {
    id: string;
    name: string;
  };
  qcStatus?: string;
  results?: Array<TTestResultData>;
  resultLink: string;
  createdAt: string;
  updatedAt: string;
};

// ============ Results ========================
type TTestQuery = {
  search: string;
  status: string;
  fromDate: string;
  toDate: string;
  sortBy: string;
  sortOrder: string;
  priority: string;
} & TGeneralPaginatedQuery;

type TRecentTestResults = {
  results: Array<TTestData>;
  pagination: TPaginationResponse;
};

type TAvailabiltyData = {
  id: string;
  status: string;
  lastUpdate: string;
};
