import { format } from 'date-fns';

const isValidDate = (date: Date) => date instanceof Date && !isNaN(date.getTime());

export const dateTimeUTC = (date_utc: string, showTime: boolean = true) => {
  const optionsWithoutTime: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };

  const dateTime = new Date(date_utc);

  if (!isValidDate(dateTime)) {
    console.error('Invalid date value:', date_utc);
    return 'Invalid date';
  }

  const timeFormat = Intl.DateTimeFormat('en-US', options).format(dateTime).toString();
  const dateFormat = Intl.DateTimeFormat('en-US', optionsWithoutTime).format(dateTime).toString();

  return showTime ? `${dateFormat}, ${timeFormat}` : dateFormat;
};

export const formatTestDate = (date?: string) => {
  if (date) return format(new Date(date), "dd MMM, yy - hh:mm aaaaa'm'");
  return '';
};
