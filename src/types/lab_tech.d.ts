interface INBTPaginatedData<T> {
  requests: Array<T>;
  pagination: TPaginationResponse;
}

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
type TTestQueue = {
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
};

type TTestQuesRes = INBTPaginatedData<TTestQueue>;

type TTestDetailsPatient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  age: number;
};

type TTestDetails = {
  id: string;
  patient: TTestDetailsPatient;
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
  notes: string;
  technician?: string;
  createdAt: string;
  updatedAt: string;
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
  technician?: string;
  createdAt: string;
  updatedAt: string;
};

// ============ Results ========================
type TRecentResultQuery = {
  search: string;
  status: string;
  fromDate: string;
  toDate: string;
  sortBy: string;
  sortOrder: string;
  priority: string;
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

// ============ Quality Control ==================
type TQCTest = {
  id: string;
  patientName: string;
  testName: string;
  testType: string;
  type: string;
  status: string; // e.g PASSED, FAILED, PENDING
  priority: string; // e.g., High, Low, Medium
  preferredAt: string;
  deadlineAt: string;
  completedAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  turnaroundTime: number;
};

type TQCTestResp = INBTPaginatedData<TQCTest>;
