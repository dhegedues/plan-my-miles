import { createContext, useContext } from "react";
import { useFirestore } from "../firebase/Firestore";
import { getCurrentDate, getDaysBetween } from "../utils/utils";

const InputValidity = createContext();

export const useInputValidity = () => useContext(InputValidity);

export function InputValidityProvider({ children }) {
  const currentDate = getCurrentDate();

  const {
    minDate,
    maxDate,
    mileageUnit,
    minMileage,
    maxMileage,
    currentMileage,
  } = useFirestore();

  const valueBounds = {
    minDate: {
      max: currentDate,
    },
    maxDate: {
      min: currentDate,
    },
    minMileage: {
      min: 0,
      max: maxMileage,
    },
    maxMileage: {
      min: minMileage,
    },
    currentMileage: {
      min: minMileage,
      max: maxMileage,
    },
    mileageUnit: ["km", "mi"],
  };

  const isValid = (inputName) => {
    switch (inputName) {
      case "vehicleName":
        return true;
      case "minDate":
        return getDaysBetween(minDate, valueBounds.minDate.max) >= 0;
      case "maxDate":
        return getDaysBetween(valueBounds.maxDate.min, maxDate) >= 0;
      case "mileageUnit":
        return valueBounds.mileageUnit.includes(mileageUnit);
      case "minMileage":
        return (
          minMileage >= valueBounds.minMileage.min &&
          minMileage <= valueBounds.minMileage.max
        );
      case "maxMileage":
        return maxMileage >= valueBounds.maxMileage.min;
      case "currentMileage":
        return (
          currentMileage >= valueBounds.currentMileage.min &&
          currentMileage <= valueBounds.currentMileage.max
        );
      default:
        break;
    }

    return false;
  };

  const inputValidities = {
    vehicleName: isValid("vehicleName"),
    minDate: isValid("minDate"),
    maxDate: isValid("maxDate"),
    mileageUnit: isValid("mileageUnit"),
    minMileage: isValid("minMileage"),
    maxMileage: isValid("maxMileage"),
    currentMileage: isValid("currentMileage"),
  };

  const dashboardWarnings = () => {
    const inputNames = {
      vehicleName: "vehicle name",
      minDate: "starting date",
      maxDate: "end date",
      mileageUnit: "mileage unit",
      minMileage: "starting mileage",
      maxMileage: "maximum mileage",
      currentMileage: "current mileage",
    };

    const currentlyInvalidInputs = Object.keys(inputValidities).filter(
      (inputName) => !inputValidities[inputName]
    );

    const invalidNames = currentlyInvalidInputs.map(
      (input) => inputNames[input]
    );

    return `Your following inputs are currently invalid, please change them: ${invalidNames.join(
      ", "
    )}`;
  };

  const allInputsAreValid = Object.values(inputValidities).every(
    (inputValue) => inputValue === true
  );

  const vehicleSettingsAreValid = () => {
    const {
      currentMileage: currentMileageValidity,
      ...vehicleSettingsValidities
    } = inputValidities;

    return Object.values(vehicleSettingsValidities).every(
      (inputValue) => inputValue === true
    );
  };

  const showValidationMessage = (inputName, inputType) => {
    const validationMessages = {
      noError: () => "",
      valueMissing: () => "You have to fill this out",
      rangeUnderflow: () => {
        switch (inputName) {
          case "maxDate":
            return "the end date has to be at least the current date or later";
          case "minMileage":
            return "the starting mileage has to be at least 0";
          case "maxMileage":
            return "the maximum mileage has to be greater than or equal to the starting mileage";
          case "currentMileage":
            return "the current mileage has to be greater than or equal to the starting mileage";
          default:
            break;
        }
        return "the input value is too low";
      },
      rangeOverflow: () => {
        switch (inputName) {
          case "minDate":
            return "the latest possible starting date is the current date";
          case "minMileage":
            return "the starting mileage has to be less than or equal to the maximum mileage";
          case "currentMileage":
            return "the current mileage cannot be greater than the maximum mileage";
          default:
            break;
        }
        return "the input value is too high";
      },
      typeMismatch: () => `this input has to be a ${inputType}`,
    };

    const input = document.getElementById(inputName);
    const validityState = input.validity;

    let validationWarning = validationMessages.noError();

    for (const validityType in validityState) {
      const customMessage = validationMessages[validityType];

      if (validityState[validityType] && customMessage) {
        validationWarning = customMessage();
      }
    }

    input.setCustomValidity(validationWarning);
    input.reportValidity();
  };

  return (
    <InputValidity.Provider
      value={{
        allInputsAreValid,
        vehicleSettingsAreValid: vehicleSettingsAreValid(),
        inputValidities,
        valueBounds,
        showValidationMessage,
        dashboardWarnings: dashboardWarnings(),
      }}
    >
      {children}
    </InputValidity.Provider>
  );
}
