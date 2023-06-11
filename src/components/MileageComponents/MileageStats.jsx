import { useInputValidity } from "../../contexts/InputValidity";
import { useFirestore } from "../../firebase/Firestore";
import {
  getCurrentDate,
  getWeeklyAverageMileage,
  getWeeklyTargetMileage,
  getRemainingWeeks,
  getAvailableMileage,
} from "../../utils/utils";
import InputCard from "./InputCard";
import StatsCard from "./StatsCard";

function MileageStats({ calculationsEnabled }) {
  const {
    mileageUnit,
    currentMileage,
    minMileage,
    maxMileage,
    minDate,
    maxDate,
  } = useFirestore();

  const { dashboardWarnings } = useInputValidity();

  const currentDate = getCurrentDate();

  const weeklyAverageMileage = Math.floor(
    getWeeklyAverageMileage(minMileage, currentMileage, minDate, currentDate)
  );
  const weeklyTargetMileage = Math.floor(
    getWeeklyTargetMileage(
      getAvailableMileage(currentMileage, maxMileage),
      getRemainingWeeks(currentDate, maxDate)
    )
  );
  const remainingWeeks = Math.floor(getRemainingWeeks(currentDate, maxDate));

  return (
    <div>
      <h2 className="text-lg font-medium leading-6 text-gray-900">Mileage</h2>
      <div className="mt-2 grid grid-cols-1 xsp:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        <InputCard
          name="currentMileage"
          displayName="Current"
          amountUnit={mileageUnit}
          amount={currentMileage}
        />
        <StatsCard
          displayName="Weekly average"
          amount={weeklyAverageMileage}
          amountUnit={mileageUnit}
          enabled={calculationsEnabled}
        />
        <StatsCard
          displayName="Weekly target"
          amount={weeklyTargetMileage}
          amountUnit={mileageUnit}
          enabled={calculationsEnabled}
        />
      </div>
      <div className="mt-5 text-gray-500">
        {calculationsEnabled
          ? `In the upcoming ${remainingWeeks} weeks, you can drive ${weeklyTargetMileage}${mileageUnit}/week on average.`
          : dashboardWarnings}
      </div>
    </div>
  );
}

export default MileageStats;
