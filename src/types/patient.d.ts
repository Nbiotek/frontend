// profile interface
interface PersonalInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  maritalStatus: string;
  gender: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
}

interface EmergencyContact {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

interface ContactInfo {
  homeAddress: string;
  city: string;
  state: string;
  landMark: string;
  zipCode: string;
  emergencyContact: EmergencyContact;
}

interface PolicyHolder {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface InsuranceInfo {
  primaryInsuranceProvider: string;
  insurancePlanName: string;
  policyNumber: string;
  groupNumber: string;
  insurancePhoneNumber: string;
  policyHolder: PolicyHolder;
}

interface Data {
  personal: PersonalInfo;
  contact: ContactInfo;
  insurance: InsuranceInfo;
}

interface InfoApiResponse {
  data: Data;
  message: string;
  statusCode: number;
}

// Booking Interface

interface BookingSummaryProps {
  bookingData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    appointmentDate: Date;
    selectedTests: Array<{
      name: string;
      price: number;
    }>;
    location: {
      type: 'Lab' | 'Custom';
      address: string;
    };
  };
  onEdit: () => void;
  onConfirm: () => void;
}

interface BookingForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: {
    type: LocationType;
    address: string;
  };
  availableDate: Date | undefined | string;

  testRequests: Array<{
    testId: string;
    entityType: string;
  }>;
}

interface Appointment {
  id: string;
  totalAmount: number;
  data: {
    paymentLink: string;
  };
}

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
}

interface TPatientDashboard {
  totalAppointments: number;
  totalResult: number;
  totalMessages: number;
  upcomingAppointment: number;
  recentAppointments: Array<{
    id: string;
    location: {
      type: LocationType;
      address: string;
    };
    appointmentDate: string;
  }>;
}

interface AppointmentItem {
  id: string;
  title: string;
  description: string;
  tests: Array<{
    name: string;
    description: string;
    type: string;
    status: string;
  }>;
  patientName: string;
  location: {
    type: string;
    address: string;
  };
  appointmentDate: string;
  status: string;
  paymentStatus: string;
}

interface UpcomingAppointment {
  data: {
    upcomingAppointments: AppointmentItem[];
  };
}

interface PendingAppointment {
  data: {
    pendingAppointments: AppointmentItem[];
  };
}

interface PastAppointment {
  data: {
    pastAppointments: AppointmentItem[];
  };
}

type AppointmentItemProps =
  | { type: 'upcoming'; data?: { upcomingAppointments: AppointmentItem[] } }
  | { type: 'pending'; data?: { pendingAppointments: AppointmentItem[] } }
  | { type: 'past'; data?: { pastAppointments: AppointmentItem[] } };

interface;

interface TShowAppointment {
  data: AppointmentItem;
}
