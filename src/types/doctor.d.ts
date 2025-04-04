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

interface Tests {
  id: string;
  patientName: string;
  testName: string;
  priority: string;
  type: string;
  status: string;
  date: string;
  notes: string;
  createdAt: string;
  deadline: string;
}

interface TRecentActivity {
  data: {
    reviews: Tests[];
  };
}
interface Reviews {
  id: string;
  name: string;
  testType: string;
  status: string;
  date: string;
}

interface TDoctorTestReview {
  data: {
    tests: Tests[];
  };
}

interface TPatientRev {
  id: string;
  name: string;
  gender: string;
  age: number;
  phoneumber: string;
}

interface TPatientTestRev {
  id: string;
  name: string;
  category: string;
}

interface TResultRev {
  id: string;
  testName: string | null;
  testData: string | null;
  parameter: string;
  result: string;
  unit: string;
  range: string;
  reference: string;
  fileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TDoctorRev {
  id: string;
  name: string;
}

interface TTechnicianRev {
  id: string;
  name: string;
}

interface TTestRevDet {
  data: {
    id: string;
    patient: TPatientRev;
    test: TPatientTestRev;
    package: string | null;
    status: string;
    priority: string;
    preferredDate: string;
    deadline: string;
    createdAt: string;
    completedAt: string;
    notes: string;
    results: TResultRev[];
    doctor: TDoctorRev;
    referringDoctor: TDoctorRev | null;
    technician: TTechnicianRev;
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

// Referrals
interface TPatientR {
  id: string;
  patientName: string;
  patientEmail: string;
  totalAppointmentCreated: number;
  totalTestBooked: number;
}
interface TPatientReffered {
  data: {
    patients: TPatientR[];
  };
}
