export const lowerCaseRegex = /(?=.*[a-z])\w+/;
export const upperCaseRegex = /(?=.*[A-Z])\w+/;
export const numberRegex = /\d/;
export const specialCharcterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const ISSERVER = typeof window === 'undefined';

export const getAllParams = (params: Partial<TTestQuery>) => {
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
  if (p) {
    if (p.includes('_')) {
      return snakeCaseToSentenceCase(p);
    }

    return `${p[0].toUpperCase()}${p.slice(1).toLowerCase()}`;
  }
  return '';
}

export function capitalizeWord(p: string, delimiter: string = ' ') {
  const words = p.split(delimiter);
  const sentence = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return sentence;
}

export function snakeCaseToSentenceCase(input: string): string {
  const words = input.split('_');

  const sentence = words
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()
    )
    .join(' ');

  return sentence;
}

export function getInitials(word: string) {
  const charArr = word.split(' ').map((w) => w.charAt(0));
  return charArr.join('');
}

export function fmtNumber(num: number) {
  return new Intl.NumberFormat().format(num);
}

export function fileSizeConverter(size: number) {
  if (size < 1024) {
    return `${fmtNumber(size)} bytes`;
  } else if (size < 1024 * 1024) {
    return `${fmtNumber(parseInt((size / 1024).toFixed(0)))}KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${fmtNumber(parseInt((size / (1024 * 1024)).toFixed(0)))}MB`;
  }
}
