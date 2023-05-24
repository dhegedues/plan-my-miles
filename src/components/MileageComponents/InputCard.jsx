import { useEffect, useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/solid";
import { updateDataField } from "../../firebase/firebase";

function InputCard({
  name,
  displayName,
  amountUnit,
  amount,
  minAmount,
  maxAmount,
  setInputsAreValid,
}) {
  const [cardInputIsInvalid, setCardInputIsInvalid] = useState(
    amount > maxAmount || amount < minAmount
  );
  const [currentlyEditing, setCurrentlyEditing] = useState(false);

  const toggleEditing = () => {
    setCurrentlyEditing(!currentlyEditing);
  };

  const handleInputChange = (event) => {
    const numberFromInput = Number(event.target.value);
    updateDataField(name, numberFromInput);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      toggleEditing();
    }
  };

  useEffect(() => {
    const valuesInvalid = amount > maxAmount || amount < minAmount;
    setCardInputIsInvalid(valuesInvalid);
    setInputsAreValid(!valuesInvalid);
  }, [amount, maxAmount, minAmount]);

  useEffect(() => {
    const input = document.getElementById(name);
    const maxWidth = "90%";

    if (currentlyEditing) {
      input.focus();
      input.style.width = maxWidth;
    } else {
      input.style.width = `min(${input.value.length}ch, ${maxWidth})`;
      document.activeElement.blur();
    }
  }, [currentlyEditing, amount]);

  return (
    <div
      key={name}
      aria-invalid={cardInputIsInvalid}
      className={`grid grid-cols-[1fr_auto] gap-3 p-3 sm:p-5 overflow-hidden rounded-lg bg-white shadow ring-2 ring-inset ${
        currentlyEditing ? "ring-indigo-600" : "ring-transparent"
      } aria-invalid:ring-red-600`}
    >
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-500 m-0 p-0"
        >
          {displayName}
        </label>
        <div className="flex flex-row items-baseline">
          <input
            type="number"
            name={name}
            id={name}
            value={amount !== 0 ? amount : ""}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-[90%] text-gray-900 font-semibold text-xl sm:text-2xl p-0 border-none focus:ring-0"
          />
          {!currentlyEditing && (
            <span className="font-light text-gray-500">{amountUnit}</span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="rounded-full bg-white p-3 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-transparent hover:bg-gray-50"
          onClick={toggleEditing}
        >
          {currentlyEditing ? (
            <CheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

export default InputCard;
