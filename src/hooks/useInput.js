import { useState } from "react";

export const useInput = (initVal, validator) => {
  const [value, setValue] = useState(initVal);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(value);
    if (willUpdate) {
      setValue(value);
    }
    // return value;
  };
  return { value, onChange };
};
