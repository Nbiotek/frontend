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
  PATIENT = new Route('/patient', 'Nbiotek | Patient Dashboard', 'Patient Dashboard Page');
  PATIENT_INFO = new Route('/patient/info', 'Nbiotek | Patient Info', 'Patient Info Page');
  PATIENT_UPCOMING_APPOINTMENTS = new Route(
    '/patient/appointment/upcoming',
    'Nbiotek | Upcoming Appointment',
    'Patient appointment upcoming page'
  );
  PATIENT_BOOK_APPOINTMENTS = new Route(
    '/patient/appointment/booking',
    'Nbiotek | Book Appointment',
    'Patient appointment booking page'
  );
  PATIENT_PAST_APPOINTMENTS = new Route(
    '/patient/appointment/past',
    'Nbiotek | Past Appointment',
    'Patient appointment past page'
  );
  PATIENT_TEST = new Route(
    '/patient/test',
    'Nbiotek | Test request',
    'Patient appointment past page'
  );
  PATIENT_AVAILABLE_TEST = new Route(
    '/patient/test/available',
    'Nbiotek | Available test',
    'Patient test available'
  );
  PATIENT_PENDING_TEST = new Route(
    '/patient/test/pending',
    'Nbiotek | Pending Test',
    'Patient test available page'
  );
}

const ROUTES = new Routes();

export default ROUTES;
