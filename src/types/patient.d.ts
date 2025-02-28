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

interface CreateAppointmentResponse {}
