export interface BookingSummaryProps {
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

export interface BookingForm {
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

export interface Appointment {
  id: string;
  totalAmount: number;
  data: {
    paymentLink: string;
  };
}

export interface BookAppointmentDTO {
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

export interface UpcomingAppointmentResponse {}

export interface CreateAppointmentResponse {}
