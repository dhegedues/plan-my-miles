const daysInAWeek = 7;
const hoursInADay = 24;
const secondsInAnHour = 3600;
const millisecondsInASecond = 1000;
const millisecondsInADay =
  hoursInADay * secondsInAnHour * millisecondsInASecond;

export function getCurrentDate() {
  const currentUTCDate = new Date().toISOString();
  const currentUTCDateWithoutTime = currentUTCDate.split("T")[0];
  return currentUTCDateWithoutTime;
}

export function getDaysBetween(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const timeDifference = endDate.getTime() - startDate.getTime();

  const daysBetween = timeDifference / millisecondsInADay;

  // include both the starting and the end day, depending on whether the difference is negative or positive
  if (daysBetween < 0) {
    return daysBetween - 1;
  }
  return daysBetween + 1;
}

export function getWeeklyAverageMileage(
  minMileage,
  currentMileage,
  minDate,
  currentDate
) {
  const mileageDriven = currentMileage - minMileage;
  const daysUntilNow = getDaysBetween(minDate, currentDate);
  const dailyAverage = mileageDriven / daysUntilNow;

  return dailyAverage * daysInAWeek;
}

export function getAvailableMileage(currentMileage, maxMileage) {
  return maxMileage - currentMileage;
}

export function getRemainingWeeks(currentDate, maxDate) {
  const daysTillEnd = getDaysBetween(currentDate, maxDate);

  return daysTillEnd / daysInAWeek;
}

export function getWeeklyTargetMileage(availableMileage, remainingWeeks) {
  if (remainingWeeks <= 1) {
    return availableMileage;
  }
  return availableMileage / remainingWeeks;
}
