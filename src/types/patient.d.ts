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
  appointmentDate: Date | undefined;
  selectedTests: CartItem[]; // Specify the type here
}

export interface Appointment {
  id: string;
  patientName: string;
  appointmentDate: Date;
  tests: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: {
    type: 'Lab' | 'Custom';
    address: string;
  };
  totalAmount: number;
}

export interface BookAppointmentDTO {
  fullName: string;
  email: string;
  phoneNumber: string;
  appointmentDate: Date;
  selectedTests: Array<{
    id: string;
    quantity: number;
  }>;
  location: {
    type: 'Lab' | 'Custom';
    address: string;
  };
}
