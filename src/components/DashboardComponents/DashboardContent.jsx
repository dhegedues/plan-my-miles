import MileageStats from "./MileageStats";
import Projection from "./Projection";
import Trips from "./Trips";
import { daysBetween } from "../../utils/dates";
import { useEffect, useState } from "react";

function DashboardContent() {
  const [mileageUnit, setMileageUnit] = useState('km');
  const [minMileage, setMinMileage] = useState(16);
  const [maxMileage, setMaxMileage] = useState(15000);
  const [currentMileage, setCurrentMileage] = useState(2608);
  const [currentDate, setCurrentDate] = useState("2023-04-24");
  const [minDate, setMinDate] = useState("2023-02-27");
  const [maxDate, setMaxDate] = useState("2023-12-31");

  const [mileageHistory, setMileageHistory] = useState([
    [minDate, minMileage],
    ["2023-03-05", 378],
    ["2023-03-16", 824],
    ["2023-03-23", 1371],
    ["2023-04-01", 1918],
    ["2023-04-13", 2287],
    [currentDate, currentMileage],
    [maxDate, maxMileage]
  ]);

  const [trips, setTrips] = useState([
    {
      startDate: "2023-07-28",
      endDate: "2023-07-30",
      mileageNeeded: 1100,
      name: "Innsbruck"
    },
    {
      startDate: "2023-09-16",
      endDate: "2023-09-18",
      mileageNeeded: 500,
      name: "Test"
    },
    {
      startDate: "2023-10-27",
      endDate: "2023-11-20",
      mileageNeeded: 4000,
      name: "Spanien"
    }
  ]);

  const [tripsMileage, setTripsMileage] = useState(sumTripsMileages());
  const [tripsDays, setTripsDays] = useState(sumTripsDays());
  const [availableDays, setAvailableDays] = useState(daysBetween(currentDate, maxDate) - tripsDays);
  const [availableMileage, setAvailableMileage] = useState(maxMileage - currentMileage - tripsMileage);
  const [allowedMileagePerDay, setAllowedMileagePerDay] = useState(availableMileage / availableDays);
  const [weeklyAverage, setWeeklyAverage] = useState(calcWeeklyAverage());
  const [remainingWeeks, setRemainingWeeks] = useState(calcRemainingWeeks());

  function sumTripsMileages() {
    return trips.reduce((accumulator, currentTrip) => accumulator + currentTrip.mileageNeeded, 0);
  }

  function sumTripsDays() {
    return trips.reduce((accumulator, currentTrip) => {
      return accumulator + daysBetween(currentTrip.startDate, currentTrip.endDate) + 1;
    }, 0);
  }

  function calcWeeklyAverage() {
    return ((currentMileage - minMileage) / daysBetween(minDate, currentDate)) * 7;
  }

  function calcRemainingWeeks() {
    return daysBetween(currentDate, maxDate) / 7;
  }

  useEffect(() => {
    setTripsMileage(sumTripsMileages());
    setTripsDays(sumTripsDays());
  }, [trips]);

  useEffect(() => {
    setAvailableMileage(maxMileage - currentMileage - tripsMileage);
  }, [maxMileage, currentMileage, tripsMileage]);

  useEffect(() => {
    setAvailableDays(daysBetween(currentDate, maxDate) - tripsDays);
    setRemainingWeeks(calcRemainingWeeks());
  }, [currentDate, maxDate, tripsDays]);

  useEffect(() => {
    setAllowedMileagePerDay(availableMileage / availableDays);
  }, [availableMileage, availableDays]);

  return (
    <div className="bg-gray-50 px-4 py-5 sm:p-6 flex flex-col gap-8">
      <MileageStats currentMileage={currentMileage} weeklyAverage={weeklyAverage} allowedMileagePerDay={allowedMileagePerDay} remainingWeeks={remainingWeeks} mileageUnit={mileageUnit} />
      <Projection mileageHistory={mileageHistory} trips={trips} allowedMileagePerDay={allowedMileagePerDay}/>
      <Trips />
    </div>
  )
}

export default DashboardContent