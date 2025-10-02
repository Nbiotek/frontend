type TAdminUsersItem = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminUsersResp = {
  formatted: Array<TAdminUsersItem>;
  pagination: TPaginationResponse;
};

type TAdminDashboardStats = {
  totalUsers: number;
  totalPackages: number;
  totalLabTestRequests: number;
  totalTestResults: number;
  superAdmin: number;
  doctor: number;
  referralDoctor: number;
  patient: number;
  labCoordinator: number;
  labTechnician: number;
  receptionist: number;
  marketer: number;
  technicalCoordinator: number;
  totalAppointments: number;
  totalRevenue: string;
};

type TAdminTestItemBase = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements: Array<string>;
  category: string;
  discountedPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminTestItem = TAdminTestItemBase & {
  tests?: Array<TAdminTestItemBase>;
};

type TChartQuery = {
  period: string;
};

type TAdminChartRes = {
  data: Array<{
    date: string;
    total: number;
  }>;
};

type TAdminCarouselItem = {
  id: string;
  title: string;
  description: string;
  linkTitle: string;
  linkStyle: string;
  link: string;
  media: Array<{
    file_url: string;
    mime_type: string;
    bucket: string;
    uuid: string;
  }>;
};

type TAdminHeroSection = {
  id: string;
  heading: string;
  tagline: string;
  carousel: Array<TAdminCarouselItem>;
};

type TAdminTestimonialAuthor = {
  fullName: string;
  role: string;
  media: Array<{
    file_url: string;
    mime_type: string;
    bucket: string;
    uuid: string;
  }>;
};

type TAdminTestimonial = {
  id: string;
  description: string;
  author: TAdminTestimonialAuthor;
  rating: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminTestimonialResp = {
  testimonials: Array<TAdminTestimonial>;
  pagination: TPaginationResponse;
};

type TAdminPartnerItem = {
  id: string;
  media: Array<{
    file_url: string;
    mime_type: string;
    bucket: string;
    uuid: string;
  }>;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TAdminPartnerResp = {
  partners: Array<TAdminPartnerItem>;
  pagination: TPaginationResponse;
};
