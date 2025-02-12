import { EnumRole } from './mangle';

class Route {
  path: string;
  title: string;
  description: string;
  roles: Array<EnumRole> = [EnumRole.DEFAULT];

  constructor(_path: string, _title: string, _description: string, _roles?: EnumRole[]) {
    this.path = _path;
    this.description = _description;
    this.title = _title;

    if (_roles) this.roles = _roles;
  }
}

class Routes {
  // landing
  HOME = new Route('/', 'Nbiotek | Home', 'Home');
  ABOUT = new Route('/about', 'NbioTek | About page.', 'About - Nbiotek');
  FAQS = new Route('/faqs', 'Nbiotek | FAQs', 'FAQs - Nbiotek');
  PRIVACY_POLICY = new Route(
    '/privacy-policy',
    'Nbiotek Privacy Policy',
    'Privacy Policy - Nbiotek'
  );
  UNAUTHORIZED = new Route('/unathorized', '', '');

  // auth
  REGISTER = new Route('/auth/register', 'NbioTek | Create Account', 'Create Account - Nbiotek');
  LOGIN = new Route('/auth/login', 'NbioTek | Login page', 'Login');
  OTP = new Route('/auth/otp', 'NbioTek | One Time Password (OTP)', 'One Time Password (OTP)');
  FORGOT_PWD = new Route('/auth/forgot-pwd', 'NbioTek | Forgot Password', 'Forgot password');
  PWD_RESET = new Route('/auth/pwd-reset', 'NbioTek | Password Reset', 'Password reset');

  PATIENT_REG_INFO = new Route(
    '/auth/register/p',
    'NbioTek | Personal Info',
    'Patient Personal Info Reg.'
  );
  PATIENT_REG_CONTACT = new Route(
    '/auth/register/p/c',
    'Patient Contact Info Reg.',
    'NbioTek | Contact Info'
  );
  PATIENT_REG_INSURANCE = new Route(
    '/auth/register/p/i',
    'NbioTek | Insurance Info',
    'Patient Insurance Info Reg.'
  );

  // patient
  PATIENT = new Route('/patient', 'Dashboard', 'Patient Dashboard Page');
  PATIENT_INFO = new Route('/patient/info', 'Info', 'Patient Info Page');
  PATIENT_UPCOMING_APPOINTMENTS = new Route(
    '/patient/appointment/upcoming',
    'Upcoming',
    'Patient appointment upcoming page'
  );
  PATIENT_BOOK_APPOINTMENTS = new Route(
    '/patient/appointment/booking',
    'Book',
    'Patient appointment booking page'
  );
  PATIENT_PAST_APPOINTMENTS = new Route(
    '/patient/appointment/past',
    'Past',
    'Patient appointment past page'
  );
  PATIENT_TEST = new Route(
    '/patient/test',
    'Nbiotek | Test request',
    'Patient appointment past page'
  );
  PATIENT_AVAILABLE_TEST = new Route(
    '/patient/test/available',
    'Available',
    'Patient test available'
  );
  PATIENT_PENDING_TEST = new Route(
    '/patient/test/pending',
    'Pending',
    'Patient test available page'
  );
  PATIENT_BILLING = new Route(
    '/patient/billing',
    'Billing & Payments',
    'Patient Billing nad payment page'
  );
  PATIENT_BILLING_TRANSACTION_HISTORY = new Route(
    '/patient/billing/history',
    'Transaction History',
    ' Transaction History Page'
  );
  PATIENT_BILLING_PENDING_PAYMENTS = new Route(
    '/patient/billing/pending-payments',
    'Pending Payment',
    ' Pending Payment Page'
  );
  PATIENT_BILLING_INSURANCE = new Route(
    '/patient/billing/insurance',
    'insurance',
    'Insurance Page'
  );
  PATIENT_SUPPORT = new Route('/patient/support', 'Support & Help', 'Help  Desk Page');
  PATIENT_SUPPORT_CONTACT = new Route('/patient/support/contact', 'Contact Us', 'Contact Us');
  PATIENT_SUPPORT_FAQ = new Route('/patient/support/faq', 'FAQ', 'Frequent Asked Questions');
  PATIENT_SETTINGs = new Route('/patient/settings', 'Settings', 'Settings Page');
  PATIENT_SETTINGS_SETTINGS = new Route('/patient/settings/update', 'Settings', 'Settings Page');
  PATIENT_SETTING_NOTIFICATION = new Route(
    '/patient/settings/NOTIFICATION',
    'Notification',
    'Notification Page'
  );

  // Lab Tech
  LAB_TECH = new Route('/lab-tech', 'Dashboard', 'Lab Technician Dashboard page', [
    EnumRole.LAB_TECHNICIAN
  ]);
  LAB_TECH_TEST = new Route('/lab-tech/tests', 'Test Queue', 'Lab Technician All Test', [
    EnumRole.LAB_TECHNICIAN
  ]);
  LAB_TECH_QUALITY_CONTROL_PENDING = new Route(
    '/lab-tech/qc/pending',
    'Pending',
    'Lab Technician Quality Control Pending',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_QUALITY_CONTROL_HISTORY = new Route(
    '/lab-tech/qc/history',
    'History',
    'Lab Technician Quality Control',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_RESULT_HISTORY_RECENT = new Route(
    '/lab-tech/results/recent',
    'Recent',
    'Lab Technician Recent Result',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_RESULT_HISTORY_ARCHIVED = new Route(
    '/lab-tech/results/archived',
    'Archived',
    'Lab Technician Archived Result',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_NOTIFICATION = new Route(
    '/lab-tech/notification',
    'Notifications',
    'Lab Technician Notifications',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_SUPPORT_CONTACT = new Route(
    '/lab-tech/sh/contact',
    'Contact',
    'Lab Technician contact',
    [EnumRole.LAB_TECHNICIAN]
  );
  LAB_TECH_SUPPORT_FAQ = new Route('/lab-tech/sh/faq', 'FAQ', 'Lab Technician FAQs', [
    EnumRole.LAB_TECHNICIAN
  ]);
  LAB_TECH_SETTINGS = new Route('/lab-tech/settings', 'Settings', 'Lab Technician Settings', [
    EnumRole.LAB_TECHNICIAN
  ]);

  getRedirectPathByRole(_role: EnumRole) {
    switch (_role) {
      case EnumRole.LAB_TECHNICIAN:
        return this.LAB_TECH.path;
      case EnumRole.PATIENT:
        return this.PATIENT.path;
      default:
        return this.PATIENT.path;
    }
  }

  getAllProtectedRoutes() {
    const routes = new Map<string, Array<EnumRole>>();

    routes.set(this.PATIENT.path, [EnumRole.PATIENT]);
    routes.set(this.LAB_TECH.path, [EnumRole.LAB_TECHNICIAN]);

    return routes;
  }
}

const ROUTES = new Routes();

export const roleAccessRules = {
  '/patient': [EnumRole.PATIENT],
  '/lab-tech': [EnumRole.LAB_TECHNICIAN]
};

export default ROUTES;
