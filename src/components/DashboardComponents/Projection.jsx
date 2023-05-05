import Chart from "./Chart";
import { daysBetween } from "../../utils/dates";
import { useEffect, useState } from "react";
import { PresentationChartLineIcon } from '@heroicons/react/20/solid';

function Projection({mileageHistory, trips, allowedMileagePerDay, mileageUnit, inputsAreInvalid}) {

  const [combinedHistory, setCombinedHistory] = useState(combineHistories());
  const [chartTripData, setChartTripData] = useState();

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

  useEffect(() => {
    const newChartTripData = trips.map(trip => {
      return [
        {
          name: trip.name,
          xAxis: trip.startDate
        },
        {
          xAxis: trip.endDate
        }
      ];
    });

    setChartTripData(newChartTripData);
  }, [trips])
 

  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">Projection</h2>
      <div className="mt-2 h-[24rem] flex flex-col justify-center items-center overflow-hidden rounded-lg bg-white shadow relative">
        { inputsAreInvalid
          ? <>
              <PresentationChartLineIcon className="h-8 w-8 mb-3 text-gray-400" aria-hidden="true" />
              <p className="text-gray-700">Chart will be displayed when conflicting inputs are resolved</p>
            </>
          : <Chart combinedHistory={combinedHistory} mileageUnit={mileageUnit} chartTripData={chartTripData} />
        }
      </div>
    </div>
  )
}

export default Projection