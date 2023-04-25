import { useEffect, useState } from "react";

function MileageStats({mileageUnit, currentMileage, weeklyAverage, allowedMileagePerDay, remainingWeeks}) {
  const [weeklyTarget, setWeeklyTarget] = useState(allowedMileagePerDay*7);

  const cards = [
    { name: 'Current', amount: currentMileage, essential: true },
    { name: 'Weekly average', amount: Math.floor(weeklyAverage), essential: false },
    { name: 'Weekly target', amount: Math.floor(weeklyTarget), essential: true },
  ]

  useEffect(() => {
    setWeeklyTarget(allowedMileagePerDay*7);
  }, [allowedMileagePerDay]);

  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">Mileage</h2>
      <div className="mt-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-5">
        {cards.map((card) => (
          <div key={card.name} className={`${card.essential ? '' : 'max-sm:hidden'} overflow-hidden rounded-lg bg-white shadow`}>
            <div className="p-3 xs:p-4 sm:p-5 flex items-center">
              <div className="flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                  <dd>
                    <span className="font-semibold text-xl sm:text-2xl text-gray-900">{card.amount}</span>
                    <span className="ml-1 font-light text-gray-500 text-lg">{mileageUnit}</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-gray-500">
          In the upcoming {Math.floor(remainingWeeks)} weeks, you can drive {Math.floor(weeklyTarget)+mileageUnit}/week on average in addition to your planned trips.
      </div>
    </div>
  )
}

export default MileageStats;