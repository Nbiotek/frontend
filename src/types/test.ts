export type SingleTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  requirements?: string[];
  category: string;
  discountedPrice?: number;
  type?: string;
};

export type PackageTest = {
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
