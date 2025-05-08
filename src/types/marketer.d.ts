interface TMarketerDashboard {
  totalSamplesCollected: number;
  totalAssignedTasks: number;
  totalUploadedSamples: number;
  referralActivity: {
    total: number;
    accepted: number;
    acceptanceRate: number;
  };
}

interface TFieldOfficerAnalytics {
  totalSamplesCollected: number;
  totalAssignedTask: number;
  totaluploadedSample: number;
}
interface TFieldOfficerDashboard {
  data: TFieldOfficerAnalytics;
}
interface TFieldTestRequest {
  id: string;
  patientName: string;
  testName: string;
  testType: string;
  notes: string;
  location: {
    type: string;
    address: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface TFieldTestRespones {
  data: {
    requests: FieldTestRequest[];
    pagination: Pagination;
  };
  message: string;
  statusCode: number;
  pagination: Pagination;
}
