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

type TSingleAppointment = {
  id: string;
  title: string;
  description: string;
  tests: [
    {
      name: string;
      description: string;
      type: string;
      status: string;
      priority: string;
    },
    {
      name: string;
      description: string;
      type: string;
      status: string;
      priority: string;
    }
  ];
  patientName: string;
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
  appointment: Array<TAppointmentItem>;
  pagination: TPaginationResponse;
};

type TAppointmentQuery = {
  search: string;
  status: string;
  sortOrder: string;
  toDate: string;
  fromDate: string;
} & TGeneralPaginatedQuery;
