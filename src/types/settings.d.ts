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

type TNotificationSettings = {
  id: string;
  enableSound: boolean;
  notificationType: {
    billing: boolean;
    reminders: boolean;
    receipts: boolean;
    newTestOrder: boolean;
    urgentResult: boolean;
    testCompletionReminder: boolean;
    inventoryAlerts: boolean;
    maintenanceReminder: boolean;
    testAndWorkflow: boolean;
    newAppointments: boolean;
  };
  emailNotification: boolean;
  pushNotification: {
    mobilePushNotification: boolean;
    desktopPushNotification: boolean;
  };
};
