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
  patientName: string;
  patientId: string;
  assignedTechnician: string;
  dueDate: string;
  status: string;
};

type TCurrentStaffShifts = {
  staffName: string;
  id: string;
  role: string;
  shiftType: string;
  dueDate: string;
  status: string;
};

type TDashboardData = {
  summary: TDashboardSummary;
  inventoryOverview: TInventoryOverview;
  pendingQualityControl: Array<TPendingQualityControl>;
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
