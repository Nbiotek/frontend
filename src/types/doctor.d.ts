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

interface Tests {
  id: string;
  patientName: string;
  testName: string;
  priority: string;
  testType: string;
  status: string;
  date: string;
  notes: string;
  createdAt: string;
  deadline: string;
}

interface TRecentActivity {
  data: {
    reviews: Reviews[];
  };
}

interface TDoctorTestReview {
  data: {
    tests: Tests[];
  };
}
interface TPatient {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  appointmentCount: number;
  patientType: string;
  lastAppointment: string | null;
  createdAt: string;
}
interface TDoctorAppointment {
  data: {
    patients: TPatient[];
  };
}

// Appointment
interface BookAppointmentDTO {
  fullName: string;
  email: string;
  phoneNumber: string;
  availableDate: Date | undefined | string;
  phoneNumber: string;
  location: {
    type: LocationType;
    address: string;
  };

  testRequests: Array<{
    testId: string;
    entityType: string;
  }>;
  paymentMethod: string;
}
