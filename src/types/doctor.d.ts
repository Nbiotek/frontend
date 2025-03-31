interface TDoctorDashboard {
  totalPatients: number;
  pendingTestResultReviews: number;
  totalMessages: number;
  completedTestResultReviews: number;
  referralActivity: {
    total: 0;
    accepted: 0;
    acceptanceRate: 0;
  };
}
