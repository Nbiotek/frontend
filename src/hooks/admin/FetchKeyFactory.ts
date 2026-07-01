import { SUPER_ADMIN, ECOMMERCE } from '@/constants/api';
import { get } from 'lodash';

export const superAdmin = {
  getStats() {
    return {
      path: SUPER_ADMIN.STATS,
      keys: () => [SUPER_ADMIN.STATS] as const
    };
  },

  getUsers(query: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.USERS,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.USERS, query] as const,
      params: query
    };
  },

  getSingleTest(query: Partial<TAdminTestQuery>) {
    return {
      path: SUPER_ADMIN.SINGLE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_TEST, query],
      params: query
    };
  },

  getPackageTest(query: Partial<TAdminTestQuery>) {
    return {
      path: SUPER_ADMIN.PACKAGE_TEST,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.PACKAGE_TEST, query] as const,
      params: query
    };
  },

  getTestById(id: string) {
    return {
      path: SUPER_ADMIN.TEST_ID.replace(':id', id),
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.TEST_ID, id] as const
    };
  },

  getPackageTestById(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_PACKAGE_TEST.replace(':id', id),
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.SINGLE_PACKAGE_TEST, id] as const
    };
  },

  getTestTemplates() {
    return {
      path: SUPER_ADMIN.TEST_TEMPLATES,
      keys: () => [SUPER_ADMIN.TEST_TEMPLATES] as const
    };
  },

  getTestTemplateById(testId: string) {
    return {
      path: SUPER_ADMIN.TEST_TEMPLATES,
      keys: () => [SUPER_ADMIN.TEST_TEMPLATES, testId] as const,
      params: { testId }
    };
  },

  getTestResultChart(query: TChartQuery) {
    return {
      path: SUPER_ADMIN.RESULT_CHART,
      keys: () => [SUPER_ADMIN.RESULT_CHART, query],
      params: query
    };
  },

  getPaymentChart(query: TChartQuery) {
    return {
      path: SUPER_ADMIN.PAYMENT_CHART,
      keys: () => [SUPER_ADMIN.PAYMENT_CHART, query],
      params: query
    };
  },

  getHeroSection() {
    return {
      path: SUPER_ADMIN.LANDING_PAGE,
      keys: () => [SUPER_ADMIN.LANDING_PAGE]
    };
  },

  getHeroSectionId(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_LANDING.replace(':id', id),
      keys: () => [SUPER_ADMIN.LANDING_PAGE, SUPER_ADMIN.SINGLE_LANDING, id]
    };
  },

  getTestimonial() {
    return {
      path: SUPER_ADMIN.TESTIMONIALS,
      keys: () => [SUPER_ADMIN.TESTIMONIALS]
    };
  },

  getTestimonialsLanding() {
    return {
      path: SUPER_ADMIN.TESTIMONIALS_LANDING,
      keys: () => [SUPER_ADMIN.TESTIMONIALS_LANDING]
    };
  },

  getTestimonialId(id: string) {
    return {
      path: SUPER_ADMIN.SINGLE_TESTIMONIAL.replace(':id', id),
      keys: () => [SUPER_ADMIN.TESTIMONIALS, SUPER_ADMIN.SINGLE_TESTIMONIAL, id]
    };
  },

  getPartners() {
    return {
      path: SUPER_ADMIN.CONTENT_PARTNERS,
      keys: () => [SUPER_ADMIN.CONTENT_PARTNERS]
    };
  },

  getPartnersLanding() {
    return {
      path: SUPER_ADMIN.CONTENT_PARTNERS_LANDING,
      keys: () => [SUPER_ADMIN.CONTENT_PARTNERS_LANDING]
    };
  },

  getDoctorsFees() {
    return {
      path: SUPER_ADMIN.DOCTORS_FEES,
      keys: () => [SUPER_ADMIN.DOCTORS_FEES]
    };
  },

  getBlogCategories(query?: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.BLOG_CATEGORIES,
      keys: () => [SUPER_ADMIN.BLOG_CATEGORIES, query] as const,
      params: query
    };
  },

  getBlogs(query?: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.BLOGS,
      keys: () => [SUPER_ADMIN.BLOGS, query] as const,
      params: query
    };
  },

  getBlogById(id: string) {
    return {
      path: SUPER_ADMIN.BLOG_ID.replace(':id', id),
      keys: () => [SUPER_ADMIN.BLOG_ID, id] as const
    };
  },

  getBiohubs(query?: Partial<TGeneralPaginatedQuery>) {
    return {
      path: SUPER_ADMIN.BIOHUB,
      keys: () => [SUPER_ADMIN.BIOHUB, query] as const,
      params: query
    };
  },

  getBiohubById(id: string) {
    return {
      path: SUPER_ADMIN.BIOHUB_ID.replace(':id', id),
      keys: () => [SUPER_ADMIN.BIOHUB_ID, id] as const
    };
  },

  getPatients(query: Partial<TAdminPatientQuery>) {
    return {
      path: SUPER_ADMIN.PATIENTS,
      keys: () => [SUPER_ADMIN.STATS, SUPER_ADMIN.PATIENTS, query] as const,
      params: query
    };
  },

  getProductById(id: string) {
    return {
      path: ECOMMERCE.PRODUCT_ID.replace(':id', id),
      keys: () => [ECOMMERCE.PRODUCT_ID, id] as const
    };
  },

  getProducts(params?: {
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    page?: number;
    limit?: number;
    categoryId?: string;
  }) {
    return {
      path: ECOMMERCE.PRODUCTS,
      keys: () => [ECOMMERCE.PRODUCTS, params] as const,
      params
    };
  },

  getOrders() {
    return {
      path: ECOMMERCE.ORDERS,
      keys: () => [ECOMMERCE.ORDERS] as const
    };
  },

  getAdminAllOrders() {
    return {
      path: ECOMMERCE.ORDERS_ADMIN,
      keys: () => [ECOMMERCE.ORDERS_ADMIN] as const
    };
  },

  getCart() {
    return {
      path: ECOMMERCE.CART,
      keys: () => [ECOMMERCE.CART] as const
    };
  },

  getCategories() {
    return {
      path: ECOMMERCE.CATEGORIES,
      keys: () => [ECOMMERCE.CATEGORIES] as const
    };
  }
};
