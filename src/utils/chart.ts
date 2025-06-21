type ResultDataItem = {
  date: string;
  [key: string]: any;
};

export function filteredData(data: ResultDataItem[], timeRange: string): ResultDataItem[] {
  const referenceDate = new Date();
  let daysToSubtract = 90;

  if (timeRange === '30d') {
    daysToSubtract = 30;
  } else if (timeRange === '7d') {
    daysToSubtract = 7;
  }

  const startDate = new Date(referenceDate);
  startDate.setDate(startDate.getDate() - daysToSubtract);

  return data.filter((item) => {
    const date = new Date(item.date);
    return date >= startDate;
  });
}
