interface TDoctorDashboard {
  totalPatients: number;
  pendingTestResultReviews: number;
  completedTestResultReviews: number;
  referralActivity: {
    total: 0;
    accepted: 0;
    acceptanceRate: 0;
  };
}
interface Reviews {
  id: string;
  name: string;
  testType: string;
  status: string;
  date: string;
}

interface TRecentActivity {
  data: {
    reviews: Reviews[];
  };
}
