import server from '.';
import { ECOMMERCE } from '@/constants/api';

export interface ICreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId?: string;
  images?: string[];
}

export interface IGetProductsParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
  categoryId?: string;
}

export interface IProductsPagedResponse {
  items: TProductItem[];
  pagination: TPaginationResponse;
}

export const getProducts = async (params?: IGetProductsParams) =>
  server.get<INBTServerResp<IProductsPagedResponse>>(ECOMMERCE.PRODUCTS, { params });

export const getProductById = async (id: string) =>
  server.get<INBTServerResp<TProductItem>>(ECOMMERCE.PRODUCT_ID.replace(':id', id));

export const postCreateProduct = async (payload: ICreateProductPayload) =>
  server.post<INBTServerResp<TProductItem>>(ECOMMERCE.PRODUCTS, payload);

export const putUpdateProduct = async (id: string, payload: Partial<ICreateProductPayload>) =>
  server.put<INBTServerResp<TProductItem>>(ECOMMERCE.PRODUCT_ID.replace(':id', id), payload);

export const getCart = async () => server.get<INBTServerResp<TCart>>(ECOMMERCE.CART);

export const postAddToCart = async (payload: { productId: string; quantity: number }) =>
  server.post<INBTServerResp<TCart>>(ECOMMERCE.CART_ADD, payload);

export const putUpdateCartItem = async (productId: string, quantity: number) =>
  server.put<INBTServerResp<TCart>>(ECOMMERCE.CART_UPDATE.replace(':productId', productId), {
    quantity
  });

export const getOrders = async () => server.get<INBTServerResp<TOrderItem[]>>(ECOMMERCE.ORDERS);

export const getAdminOrders = async () =>
  server.get<INBTServerResp<TOrderItem[]>>(ECOMMERCE.ORDERS_ADMIN);

export const putUpdateOrderStatus = async (id: string, status: TOrderStatus) =>
  server.put<INBTServerResp<{ order_id: string; status: TOrderStatus }>>(
    ECOMMERCE.ORDER_STATUS.replace(':id', id),
    { status }
  );

export const postCreateOrder = async (payload: {
  items: Array<{ productId: string; quantity: number }>;
  shippingAddress: { street: string; city: string; state: string; zipCode: string; phone?: string };
  paymentMethod?: 'ONLINE' | 'COD';
}) => server.post<INBTServerResp<TCreateOrderResp>>(ECOMMERCE.ORDERS, payload);

export interface ICreateCategoryPayload {
  name: string;
  description: string;
  image?: string;
}

export const getCategories = async () =>
  server.get<INBTServerResp<TProductCategoryItem[]>>(ECOMMERCE.CATEGORIES);

export const postCreateCategory = async (payload: ICreateCategoryPayload) =>
  server.post<INBTServerResp<TProductCategoryItem>>(ECOMMERCE.CATEGORIES, payload);

export const putUpdateCategory = async (id: string, payload: Partial<ICreateCategoryPayload>) =>
  server.put<INBTServerResp<TProductCategoryItem>>(
    ECOMMERCE.CATEGORY_ID.replace(':id', id),
    payload
  );
