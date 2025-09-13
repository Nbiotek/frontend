import { EnumRole } from './mangle';

export const pagination = {
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0
};

export const maritalStatus = [
  {
    label: 'Single',
    value: 'single'
  },

  {
    label: 'Married',
    value: 'married'
  },

  {
    label: 'Divorced',
    value: 'divorced'
  },
  {
    label: 'Widowed',
    value: 'widowed'
  }
];

export const gender = [
  {
    label: 'Male',
    value: 'male'
  },

  {
    label: 'Female',
    value: 'female'
  }
];

export const role = [
  {
    label: 'Lab Tech.',
    value: EnumRole.LAB_TECHNICIAN
  },

  {
    label: 'Lab Coord.',
    value: EnumRole.LAB_CORDINATOR
  },

  {
    label: 'Recept.',
    value: EnumRole.RECEPTIONIST
  },

  {
    label: 'Marketer',
    value: EnumRole.MARKETER
  },

  {
    label: 'Doctor',
    value: EnumRole.DOCTOR
  },

  {
    label: 'Technical Coord.',
    value: EnumRole.TECHNICAL_COORDINATOR
  }
];

export const theme = [
  {
    label: 'Light',
    value: 'light'
  },

  {
    label: 'Dark',
    value: 'dark'
  }
];

export const AppointmentStatus = [
  {
    label: 'Approve',
    value: 'APPROVED'
  },

  {
    label: 'Pending',
    value: 'PENDING'
  },

  {
    label: 'Cancel',
    value: 'CANCELLED'
  }
];

export const carouselStatus = [
  {
    label: 'Active',
    value: 'active'
  },

  {
    label: 'Draft',
    value: 'draft'
  }
];

export const PaymentStatus = [
  {
    label: 'Pending',
    value: 'PENDING'
  },
  {
    label: 'Processing',
    value: 'PROCESSING'
  },
  {
    label: 'Completed',
    value: 'COMPLETED'
  },
  {
    label: 'Failed',
    value: 'FAILED'
  },

  {
    label: 'Refunded',
    value: 'REFUNDED'
  }
];

export const testCategory = [
  {
    label: 'Basic',
    value: 'BASIC_TEST'
  },

  {
    label: 'Molecular',
    value: 'MOLECULAR'
  },

  {
    label: 'Blood',
    value: 'BLOOD'
  },

  {
    label: 'Advanced imaging',
    value: 'ADVANCED_IMAGING'
  }
];

export const testResultStatus = [
  {
    label: 'Low',
    value: 'Low'
  },

  {
    label: 'Medium',
    value: 'Medium'
  },

  {
    label: 'High',
    value: 'High'
  },

  {
    label: 'Normal',
    value: 'Normal'
  }
];
