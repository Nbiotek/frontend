type TAppointmentItem = {
  id: string;
  fullName: string;
  availableDate: string;
  email: string;
  phoneNumber: string;
  location: {
    type: string;
    address: string;
  };
  title?: string;
  description?: string;
  appointmentDate?: string;
  reason?: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
};

type TReceptAppointmentBase = {
  id: string;
  title: string;
  description: string;
  tests: Array<{
    name: string;
    description: string;
    type: string;
    status: string;
    priority: string;
  }>;
  patientName?: string;
  location: {
    type: string;
    address: string;
  };
  appointmentDate: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
};

type TAppointmentResp = {
  appointment: Array<TReceptAppointmentBase>;
  pagination: TPaginationResponse;
};

type TAppointmentQuery = TGeneralPaginatedQuery & {
  search: string;
  status: string;
  sortOrder: string;
  toDate: string;
  fromDate: string;
  month: string;
};

type TReceptionistPatientItem = {
  id: string;
  email: string;
  isProfileCompleted: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  maritalStatus: string;
  profileStatus: string;
  patientPersonal: {
    id: string;
    maritalStatus: string;
    gender: string;
    dateOfBirth: string;
    weight: string;
    height: string;
    primaryCarePhysician?: string;
  };
  patientContact: {
    id: string;
    homeAddress: string;
    city: string;
    state: string;
    landmark?: string;
    zipCode?: string;
  };
  patientEmergencyContact: {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
  };
};

type TReceptAllPatientRes = {
  patients: Array<TReceptionistPatientItem>;
  pagination: TPaginationResponse;
};

type TReceptUpdateApptPayload = {
  paymentStatus?: string;
  status?: string;
  appointmentDate?: string;
};

type TPatientApptResp = {
  appointments: Array<TReceptAppointmentBase>;

  pagination: TPaginationResponse;
};

type TReceptionistDashboardSummary = {
  totalAppointments: number;
  pendingAppointments: number;
  totalRevenue: number;
  totalPatients: number;
  todayAppointments: number;
};

type TReceptionistDashboardAppointment = {
  id: string;
  patientName: string;
  appointmentDate: string;
  status: string;
  tests: Array<{
    name: string;
    type: string;
    price: number;
  }>;
  PaymentMethod: string;
  totalAmount: number;
};

type TReceptionistDashboardResp = {
  statistics: TReceptionistDashboardSummary & {
    appointments: Array<TReceptionistDashboardAppointment>;
  };
};
