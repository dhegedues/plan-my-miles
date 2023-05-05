import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

function MileageStats({mileageUnit, currentMileage, setCurrentMileage, minMileage, maxMileage, weeklyAverage, allowedMileagePerDay, remainingWeeks}) {
  const [weeklyTarget, setWeeklyTarget] = useState(allowedMileagePerDay*7);

  const cards = [
    { name: 'Current', amount: currentMileage, minAmount: minMileage, maxAmount: maxMileage, editAction: setCurrentMileage },
    { name: 'Weekly average', amount: Math.floor(weeklyAverage)},
    { name: 'Weekly target', amount: Math.floor(weeklyTarget)},
  ];

  useEffect(() => {
    setWeeklyTarget(allowedMileagePerDay*7);
  }, [allowedMileagePerDay]);

  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">Mileage</h2>
      <div className="mt-2 grid grid-cols-1 xsp:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5">
        {cards.map((card) => (
          <StatsCard key={card.name} cardData={card} mileageUnit={mileageUnit}/>
        ))}
      </div>
      <div className="mt-5 text-gray-500">
        {allowedMileagePerDay > 0
          ? `In the upcoming ${Math.floor(remainingWeeks)} weeks, you can drive ${Math.floor(weeklyTarget)+mileageUnit}/week on average in addition to your planned trips.`
          : ''
        }
      </div>
    </div>
  )
}

export default MileageStats;