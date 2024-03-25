import { useState } from "react";

const useInput = (initialValue, validateValue, type) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  let hasError = false;
  if (type === "dob") {
    hasError = !valueIsValid;
  } else {
    hasError = !valueIsValid && isTouched;
  }

  const valueChangeHandler = (value) => {
    setEnteredValue(value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue(initialValue);
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
