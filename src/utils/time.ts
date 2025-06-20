export const calculateTime = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

export const calculateTimeStr = (secs: number) => {
  const time = calculateTime(secs);
  const arr = time.split(':');

  return `${arr[0]}mins, ${arr[1]}secs`;
};

export const timestampToDate = (ts: number) => {
  const date = new Date(ts);

  return new Intl.DateTimeFormat('en-Us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
