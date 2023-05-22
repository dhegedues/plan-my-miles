import { useFirestore } from "../../firebase/Firestore";
import { getCurrentDate, getDaysBetween } from "../../utils/utils";
import { updateDataField } from "../../firebase/firebase";

function SettingsInput({ type, name, placeholder, value }) {
  const { minDate, minMileage, maxMileage } = useFirestore();

  const handleInputChange = (event) => {
    const newValue =
      type === "number" ? Number(event.target.value) : event.target.value;
    updateDataField(name, newValue);
  };

  const determineMinValue = () => {
    if (name === "maxDate") {
      const currentDate = getCurrentDate();
      if (getDaysBetween(minDate, currentDate) > 0) {
        return currentDate;
      }
      return minDate;
    }
    if (name === "minMileage") {
      return 0;
    }
    if (name === "maxMileage") {
      return minMileage;
    }

    return null;
  };

  const determineMaxValue = () => {
    if (name === "minDate") {
      return getCurrentDate();
    }
    if (name === "minMileage") {
      return maxMileage;
    }

    return null;
  };

  const determineValidity = () => {
    if (name === "minMileage") {
      return value >= determineMinValue() && determineMaxValue() >= value;
    }
    if (name === "maxMileage") {
      return value >= determineMinValue();
    }
    if (name === "minDate") {
      return getDaysBetween(value, determineMaxValue()) >= 0;
    }
    if (name === "maxDate") {
      return getDaysBetween(determineMinValue(), value) >= 0;
    }

    return true;
  };

  return (
    <div>
      {type === "mileageUnit" ? (
        <div className="">
          <label htmlFor="mileageUnit" className="sr-only">
            Mileage unit
          </label>
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="rounded-md shadow-sm h-full border-0 bg-white py-0 pl-3 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>km</option>
            <option>mi</option>
          </select>
        </div>
      ) : (
        <div className="mt-2 rounded-md shadow-sm">
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            min={determineMinValue()}
            max={determineMaxValue()}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-invalid={!determineValidity()}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 aria-invalid:ring-2 aria-invalid:ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      )}
    </div>
  );
}

export default SettingsInput;
