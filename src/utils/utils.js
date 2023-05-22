export function getCurrentDate() {
  let date = new Date();
  date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return date.toISOString().split("T")[0];
}

export function getDaysBetween(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const timeDifference = endDate.getTime() - startDate.getTime();

  let daysBetween = timeDifference / (1000 * 3600 * 24);

  if (daysBetween < 0) {
    daysBetween -= 1;
  } else {
    daysBetween += 1;
  }

  return daysBetween;
}

export function getWeeklyAverageMileage(
  minMileage,
  currentMileage,
  minDate,
  currentDate
) {
  const mileageDriven = currentMileage - minMileage;
  const daysUntilNow = getDaysBetween(minDate, currentDate);

  return (mileageDriven / daysUntilNow) * 7;
}

export function getAvailableMileage(currentMileage, maxMileage) {
  return maxMileage - currentMileage;
}

export function getRemainingWeeks(currentDate, maxDate) {
  return getDaysBetween(currentDate, maxDate) / 7;
}

export function getWeeklyTargetMileage(availableMileage, remainingWeeks) {
  if (remainingWeeks <= 1) {
    return availableMileage;
  }
  return availableMileage / remainingWeeks;
}
