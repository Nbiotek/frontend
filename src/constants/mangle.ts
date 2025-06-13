export enum Mangle {
  SESSION_TOKEN = '_nbst',
  PATIENT_PERSONAL_INFO = '_ppi',
  PATIENT_CONTACT_INFO = '_pci',
  PATIENT_INSURANCE_INFO = '_pii',
  PATIENT_CURRENT_FORM = '_pcf'
}

export enum EnumPatientForm {
  PEROSNAL = Mangle.PATIENT_PERSONAL_INFO,
  CONTACT = Mangle.PATIENT_CONTACT_INFO,
  INSURANCE = Mangle.PATIENT_INSURANCE_INFO
}

export enum EnumRole {
  DEFAULT = 'DEFAULT',
  SUPER_ADMIN = 'SUPER_ADMIN',
  DOCTOR = 'DOCTOR',
  REFERRAL_DOCTOR = 'REFERRAL_DOCTOR',
  PATIENT = 'PATIENT',
  LAB_CORDINATOR = 'LAB_CORDINATOR',
  LAB_TECHNICIAN = 'LAB_TECHNICIAN',
  RECEPTIONIST = 'RECEPTIONIST',
  MARKETER = 'MARKETER',
  TECHNICAL_COORDINATOR = 'TECHNICAL_COORDINATOR'
}

export enum EnumUserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  INVITED = 'invited',
  SUSPENDED = 'suspended',
  AVAILABLE = 'Available'
}

export enum EnumTestLocation {
  CUSTOM = 'Custom',
  LAB = 'Lab'
}
