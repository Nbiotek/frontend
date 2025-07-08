type SingleTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements?: string[];
  category: string;
  discountedPrice?: number;
  type?: string;
};

type PackageTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements?: string[];
  category?: string;
  discountedPrice?: number;
  tests: SingleTest[];
  type?: string;
};

type AllTestResponse = {
  data: {
    requests: SingleTest[];
  };
};

type AllPackageTestResponse = {
  data: PackageTest[];
};

interface TestQueryParams {
  type?: 'SINGLE' | 'PACKAGE';
  category?: 'MOLECULAR' | 'ADVANCED_IMAGING';
  page?: number;
  limit?: number;
  search?: string;
}

interface PaginatedResponse<T> {
  data: {
    requests: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      limit: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}
