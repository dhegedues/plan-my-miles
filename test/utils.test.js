import { describe, test, expect } from "vitest";
import {
  getCurrentDate,
  getDaysBetween,
  getWeeklyAverageMileage,
  getAvailableMileage,
  getWeeklyTargetMileage,
  getRemainingWeeks,
} from "../src/utils/utils";

describe("getCurrentDate", () => {
  test("is in format YYYY-MM-DD", () => {
    const currentDate = getCurrentDate();
    const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    expect(isoDateRegex.test(currentDate)).toBeTruthy();
  });
});

describe("getDaysBetween", () => {
  test("the same date is 1", () => {
    expect(getDaysBetween("1980-10-02", "1980-10-02")).toBe(1);
  });

  test("two adjacent dates is 2", () => {
    expect(getDaysBetween("2023-01-01", "2023-01-02")).toBe(2);
  });

  test("the same day of two adjacent non-leap years is 366", () => {
    expect(getDaysBetween("2022-03-02", "2023-03-02")).toBe(366);
  });

  test("the same day of two adjacent leap years is 367", () => {
    expect(getDaysBetween("2023-03-02", "2024-03-02")).toBe(367);
  });

  test("between two dates in the wrong order is negative", () => {
    expect(getDaysBetween("1980-10-07", "1980-10-01")).toBe(-7);
  });
});

describe("getWeeklyAverageMileage", () => {
  test("is extrapolated from 1 day to 1 week correctly", () => {
    const minMileage = 0;
    const currentMileage = 10;
    const minDate = "2023-02-28";
    const currentDate = "2023-02-28";
    expect(
      getWeeklyAverageMileage(minMileage, currentMileage, minDate, currentDate)
    ).toBe((currentMileage - minMileage) * 7);
  });

  test("is 100 for a mileage of 200 in two weeks", () => {
    const minMileage = 0;
    const currentMileage = 200;
    const minDate = "2023-01-01";
    const currentDate = "2023-01-14";
    expect(
      getWeeklyAverageMileage(minMileage, currentMileage, minDate, currentDate)
    ).toBe(100);
  });
});

describe("getAvailableMileage", () => {
  test("is correct for given current and max mileages", () => {
    const currentMileage = 10;
    const maxMileage = 20;
    expect(getAvailableMileage(currentMileage, maxMileage)).toBe(
      maxMileage - currentMileage
    );
  });
});

describe("getRemainingWeeks", () => {
  test("is 1 for an exact week", () => {
    const currentDate = "2023-01-01";
    const maxDate = "2023-01-07";
    expect(getRemainingWeeks(currentDate, maxDate)).toBe(1);
  });

  test("is less than 1 for 1 day", () => {
    const currentDate = "2023-01-01";
    const maxDate = "2023-01-01";
    expect(getRemainingWeeks(currentDate, maxDate)).toBeLessThan(1);
  });

  test("is around 1.43 for 10 days", () => {
    const currentDate = "2023-01-01";
    const maxDate = "2023-01-10";
    expect(getRemainingWeeks(currentDate, maxDate)).toBeCloseTo(1.43);
  });
});

describe("getWeeklyTargetMileage", () => {
  test("is all of the available mileage for 1 remaining week", () => {
    const availableMileage = 1000;
    const remainingWeeks = 1;
    expect(getWeeklyTargetMileage(availableMileage, remainingWeeks)).toBe(
      availableMileage
    );
  });

  test("is all of the available mileage for less than 1 remaining week", () => {
    const availableMileage = 1000;
    const remainingWeeks = 0.2;
    expect(getWeeklyTargetMileage(availableMileage, remainingWeeks)).toBe(
      availableMileage
    );
  });

  test("is around 188.86 for a mileage of 1322 in 7 weeks", () => {
    const availableMileage = 1322;
    const remainingWeeks = 7;
    expect(
      getWeeklyTargetMileage(availableMileage, remainingWeeks)
    ).toBeCloseTo(availableMileage / remainingWeeks);
  });
});
