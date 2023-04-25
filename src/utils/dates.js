export function daysBetween(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
}