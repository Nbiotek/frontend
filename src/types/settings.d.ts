type TProfileSettings = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  contactAddress: string;
  zipCode: string;
  city: string;
  landMark: string;
  maritalStatus: string;
  gender: string;
  dateOfBirth: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isProfileCompleted: boolean;
  role: string;
  recoveryEmail: settings;
  recoveryPhone: settings;
  appearance: string;
  language: string;
  twoFactorEnabled: boolean;
  profilePhoto: string;
};

type TRecoveryContactSettings = {
  recoveryEmail: string;
  recoveryPhone: string;
};
