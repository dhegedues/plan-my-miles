import { useInputValidity } from "../../contexts/InputValidity";
import { updateDataField } from "../../firebase/firebase";

function SettingsInput({ type, name, placeholder, value }) {
  const { inputValidities, valueBounds, showValidationMessage } =
    useInputValidity();

  const handleInputChange = (event) => {
    showValidationMessage(event.target.name, event.target.type);
    const newValue =
      type === "number" ? Number(event.target.value) : event.target.value;
    updateDataField(name, newValue);
  };

  return (
    <div>
      {type === "mileageUnit" ? (
        <div>
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
            min={valueBounds[name] && valueBounds[name].min}
            max={valueBounds[name] && valueBounds[name].max}
            onChange={handleInputChange}
            placeholder={placeholder}
            aria-invalid={!inputValidities[name]}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 aria-invalid:ring-2 aria-invalid:ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      )}
    </div>
  );
}

export default SettingsInput;
