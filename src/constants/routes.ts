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
  HOME = new Route('/', 'Home', 'Home page - Nbiotek');
  ABOUT = new Route('/about', 'About - Nbiotek', 'About page of Nbiotek.');
  FAQS = new Route('/faqs', 'FAQs - Nbiotek', 'Nbiotek frequently asked questions');
  PRIVACY_POLICY = new Route(
    '/privacy-policy',
    'Privacy Policy - Nbiotek',
    'Nbiotek Privacy Policy'
  );

  // auth
  REGISTER = new Route(
    '/auth/register',
    'Create Account - Nbiotek',
    'Create Account page for Nbiotek'
  );
  LOGIN = new Route('/auth/login', 'Login', 'Login page');

  // patient
  PATIENT = new Route('/patient', 'Dashboard', 'Patient Dashboard Page');
  PATIENT_INFO = new Route('/patient/info', 'Patient Info', 'Patient Info Page');
  PATIENT_UPCOMING_APPOINTMENTS = new Route(
    '/patient/appointment/upcoming',
    'Upcoming Appointment',
    'Patient appointment upcoming page'
  );
  PATIENT_BOOK_APPOINTMENTS = new Route(
    '/patient/appointment/booking',
    'Book Appointment',
    'Patient appointment booking page'
  );
  PATIENT_PAST_APPOINTMENTS = new Route(
    '/patient/appointment/past',
    'PatienPast Appointment',
    'Patient appointment past page'
  );
  PATIENT_TEST = new Route('/patient/test', 'Test request', 'Patient appointment past page');
  PATIENT_AVAILABLE_TEST = new Route(
    '/patient/test/available',
    'Available test',
    'Patient test available page'
  );
  PATIENT_PENDING_TEST = new Route(
    '/patient/test/pending',
    'Pending Test',
    'Patient test available page'
  );
}

const ROUTES = new Routes();

export default ROUTES;
