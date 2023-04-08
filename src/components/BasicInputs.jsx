import DateInput from "./DateInput";
import MileageInput from "./MileageInput";

function BasicInputs() {
  return (
    <div className="flex rounded-xl border shadow-lg divide-x">
      <div className="flex align-middle justify-center p-3">
        <MileageInput label="Current Mileage" name="currentMileage" />
      </div>
      <div className="grid grid-cols-2 p-3 gap-3">
        <DateInput label="Start Date" name="startDate" />
        <DateInput label="End Date" name="endDate" />
        <MileageInput label="Start Mileage" name="startMileage" />
        <MileageInput label="Max Mileage" name="maxMileage" />
      </div>
    </div>
  )
}

export default BasicInputs