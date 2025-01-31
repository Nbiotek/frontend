class Route {
  path: string;

  title: string;

  description: string;

  constructor(path: string, title: string, description: string) {
    this.path = path;
    this.title = title;
    this.description = description;
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

  // auth
  REGISTER = new Route('/auth/register', 'NbioTek | Create Account', 'Create Account - Nbiotek');
  LOGIN = new Route('/auth/login', 'NbioTek | Login page', 'Login');
  OTP = new Route('/auth/otp', 'NbioTek | One Time Password (OTP)', 'One Time Password (OTP)');

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

  BILLING = new Route('/patient/billing', 'Billing & Payments', 'Patient Billing nad payment page');

  BILLING_TRANSACTION_HISTORY = new Route(
    '/patient/billing/history',
    'Transaction History',
    ' Transaction History Page'
  );

  BILLING_PENDING_PAYMENTS = new Route(
    '/patient/billing/pending-payments',
    'Pending Payment',
    ' Pending Payment Page'
  );

  BILLING_INSURANCE = new Route('/patient/billing/insurance', 'insurance', 'Insurance Page');

  SUPPORT = new Route('/patient/support', 'Support & Help', 'Help  Desk Page');

  SUPPORT_CONTACT = new Route('/patient/support/contact', 'Contact Us', 'Contact Us');

  SUPPORT_FAQ = new Route('/patient/support/faq', 'FAQ', 'Frequent Asked Questions');

  SETTINGs = new Route('/patient/settings', 'Settings', 'Settings Page');

  SETTINGS_SETTINGS = new Route('/patient/settings/update', 'Settings', 'Settings Page');
  SETTING_NOTIFICATION = new Route(
    '/patient/settings/NOTIFICATION',
    'Notification',
    'Notification Page'
  );
}

const ROUTES = new Routes();

export default ROUTES;
