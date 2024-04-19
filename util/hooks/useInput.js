import { useState } from "react";

const useInput = (initialValue, validateValue, type) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  let hasError = false;
  if (type === "dob") {
    hasError = !valueIsValid;
  } else {
    hasError = !valueIsValid && (isTouched || isFormSubmitted);
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
    setIsFormSubmitted(false);
  };

  const formStateChangeHandler = () => {
    setIsFormSubmitted(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    formStateChangeHandler,
  };
};

export default useInput;
