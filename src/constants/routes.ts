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
}

const ROUTES = new Routes();

export default ROUTES;
