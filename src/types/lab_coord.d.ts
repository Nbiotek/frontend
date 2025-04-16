type TDashboardSummary = {
  dailySampleVolume: number;
  avgTurnaroundTime: number;
  qcPassRate: number;
  utilizationRate: number;
};

type TInventoryOverview = {
  totalStocks: number;
  lowStocks: number;
  expiringSoon: number;
  calibrationDue: number;
  maintenanceDue: number;
};

type TPendingQualityControl = {
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

type TCurrentStaffShifts = {
  id: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  dueDate: string;
  staff: {
    firstName: string;
    lastName: string;
    id: string;
    role: string;
  };
};

type TDashboardData = {
  summary: TDashboardSummary;
  inventoryOverview: TInventoryOverview;
  pendingQualityControl: Array<TTestData>;
  currentStaffShifts: Array<TCurrentStaffShifts>;
};

type TAvailableLabTechs = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
};

type TAvailableLabTechsData = {
  technicians: Array<TAvailableLabTechs>;
  total: number;
};

// Inventory
type TinventoryQuery = {
  search: string;
  category: string;
  lowStock: boolean;
  expiringSoon: boolean;
} & TGeneralPaginatedQuery;

type TInventoryItem = {
  id: string;
  name: string;
  category: string;
  stockQuantity: number;
  unit: string;
  reorderLevel: number;
  supplierName: string;
  supplierContact: string;
  lastOrderDate?: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
};

type TCreateInventory = {
  name: string;
  category: string;
  stockQuantity: nunber;
  unit: string;
  reorderLevel: number;
  supplierName: string;
  supplierContact: string;
  expiryDate: string;
};

// staff schedules
type TStaffShiftsRes = {
  shifts: Array<TCurrentStaffShifts>;
  pagination: TPaginationResponse;
};
