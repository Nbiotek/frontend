type Option<V, L> = {
  label: L;
  value: V;
};
type TNewPwdPayload = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

interface INBTApiError {
  errors: string;
  message: string;
  statusCode: number;
}

interface INBTServerResp<T> {
  data: T;
  message: string;
  statusCode: number;
}

interface INBTPaginatedData<T> {
  requests: Array<T>;
  pagination: TPaginationResponse;
}

type TPaginationResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type TGeneralPaginatedQuery = { page: number; limit: number };

type TProfileInfo = {
  id: number;
  first_name?: string;
  last_name?: string;
  other_name?: string;
  email: string;
  phone?: string;
  email_verified: bolean;
  phone_verified: boolean;
  profile_pics?: string;
  uuid: string;
  created_at: string;
  role: string;
  status: string;
  isProfileCompleted: boolean;
};

interface SessionPayload extends Pick<TProfileInfo, 'id' | 'email' | 'role' | 'uuid'> {
  token: string;
  exp?: number;
}

interface IQueryHookResponse<T> {
  data: T;
  isLoading: boolean;
  error: unknown;
  status: 'error' | 'success' | 'pending';
}
