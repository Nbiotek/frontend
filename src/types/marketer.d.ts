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
