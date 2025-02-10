export const lowerCaseRegex = /(?=.*[a-z])\w+/;
export const upperCaseRegex = /(?=.*[A-Z])\w+/;
export const numberRegex = /\d/;
export const specialCharcterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export const ISSERVER = typeof window === 'undefined';
