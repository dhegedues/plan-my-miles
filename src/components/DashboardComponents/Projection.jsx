import Chart from "./Chart";
import { daysBetween } from "../../utils/dates";
import { useEffect, useState } from "react";

function Projection({mileageHistory, trips, allowedMileagePerDay}) {

  const [combinedHistory, setCombinedHistory] = useState(combineHistories());

  function allowedMileageBetweenDates(date1, date2) {
    const daysBetweenEntries = daysBetween(date1, date2);
    return daysBetweenEntries * allowedMileagePerDay;
  }

  function combineHistories() {
    return mileageHistory.reduce((accumulator, currentEntry, index) => {
      const newHistory = [...accumulator, currentEntry];
      if (index + 1 === mileageHistory.length-1) {
        trips.forEach(trip => {
          const latestInNewHistory = newHistory.slice(-1)[0];
          const latestDate = latestInNewHistory[0];
          const latestMileage = latestInNewHistory[1];
          const tripStartMileage =  latestMileage + allowedMileageBetweenDates(latestDate, trip.startDate);
          const tripEndMileage = tripStartMileage + trip.mileageNeeded;
          newHistory.push([trip.startDate, tripStartMileage]);
          newHistory.push([trip.endDate, tripEndMileage]);
        })
      }
      return newHistory;
    }, []);
  }

  useEffect(() => {
    setCombinedHistory(combineHistories());
  }, [mileageHistory, trips, allowedMileagePerDay]);
 

  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">Projection</h2>
      <div className={`mt-2 overflow-hidden rounded-lg bg-gray-200 relative ${allowedMileagePerDay < 0 ? '[&>#chart]:invisible [&>span]:visible' : ''}`}>
        <Chart combinedHistory={combinedHistory} />
        <span className="text-red-800 invisible absolute top-3 left-3">Please check your inputs, your allowed mileage is negative.</span>
      </div>
    </div>
  )
}

export default Projection