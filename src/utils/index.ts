export const lowerCaseRegex = /(?=.*[a-z])\w+/;
export const upperCaseRegex = /(?=.*[A-Z])\w+/;
export const numberRegex = /\d/;
export const specialCharcterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const ISSERVER = typeof window === 'undefined';

export const getAllParams = (params: Partial<TRecentResultQuery>) => {
  const { search, status, fromDate, toDate, sortBy, sortOrder, page, priority } = params;

  if (search) {
    params.search = search;
  }

  if (priority) {
    params.priority = priority;
  }

  if (status) {
    params.status = status;
  }

  if (fromDate) {
    params.fromDate = fromDate;
  }

  if (toDate) {
    params.toDate = toDate;
  }

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (sortOrder) {
    params.sortOrder = sortOrder;
  }

  if (page) {
    params.page = page;
  }

  return params;
};

export function toTitleCase(p: string) {
  return `${p[0].toUpperCase()}${p.slice(1).toLowerCase()}`;
}
