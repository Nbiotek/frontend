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

export const extractDateAndTimeFromTimeStamp = (timestamp: number) => {
  const dateTs = new Date(timestamp);
  const year = dateTs.getFullYear();
  const month = dateTs.getMonth() + 1;
  const day = dateTs.getDate();
  const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const time = Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(dateTs);

  return { date, time };
};

export const NotificationDate = (date_created_utc: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };

  const dateTime = new Date(date_created_utc);
  const { time } = extractDateAndTimeFromTimeStamp(dateTime.getTime());
  const now = new Date();

  // Calculating the start and end of the current week.
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Catering for the display of today and yesterday.
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (
    dateTime.getTime() >= today.getTime() &&
    dateTime.getTime() < today.getTime() + 24 * 60 * 60 * 1000
  ) {
    return time;
  } else {
    return dateTime.toLocaleDateString('en-US', options);
  }
};
