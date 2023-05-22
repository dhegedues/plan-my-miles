import { useFirestore } from "../../firebase/Firestore";
import SettingsBlock from "./SettingsBlock";
import SettingsInput from "./SettingsInput";
import SettingsCategoryHeading from "./SettingsCategoryHeading";

function VehicleSettings() {
  const { vehicleName, minDate, maxDate, mileageUnit, minMileage, maxMileage } =
    useFirestore();

  return (
    <div className="min-h-full bg-gray-50 md:rounded-lg px-4 py-5 sm:p-6 flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 border-b border-gray-900/10 pb-8">
        <SettingsCategoryHeading title="Vehicle" description="" />
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <SettingsBlock name="vehicleName" title="Vehicle name" description="">
            <SettingsInput type="text" name="vehicleName" value={vehicleName} />
          </SettingsBlock>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 border-b border-gray-900/10 pb-8">
        <SettingsCategoryHeading title="Dates" description="" />
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <SettingsBlock
            name="minDate"
            title="Starting date"
            description="Beginning of the time period"
          >
            <SettingsInput type="date" name="minDate" value={minDate} />
          </SettingsBlock>

          <SettingsBlock
            name="maxDate"
            title="End date"
            description="End of the time period"
          >
            <SettingsInput type="date" name="maxDate" value={maxDate} />
          </SettingsBlock>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pb-4">
        <SettingsCategoryHeading title="Mileage" description="" />
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <SettingsBlock
            name="mileageUnit"
            title="Mileage unit"
            description="Kilometers or miles"
          >
            <SettingsInput
              type="mileageUnit"
              name="mileageUnit"
              value={mileageUnit}
            />
          </SettingsBlock>

          <SettingsBlock
            name="minMileage"
            title="Starting mileage"
            description="What was the mileage on the odometer at the beginning of the given period?"
          >
            <SettingsInput type="number" name="minMileage" value={minMileage} />
          </SettingsBlock>

          <SettingsBlock
            name="maxMileage"
            title="Maximum mileage"
            description="What is the maximum mileage your vehicle is allowed to have on its odometer at the end of the given period?"
          >
            <SettingsInput type="number" name="maxMileage" value={maxMileage} />
          </SettingsBlock>
        </div>
      </div>
    </div>
  );
}

export default VehicleSettings;
