import { useState } from "react";

export const usePushWork = (callback) => {
  const initVal = window.localStorage.getItem("workList")
    ? JSON.parse(window.localStorage.getItem("workList"))
    : [];
  const [workList, setWorkList] = useState(initVal);
  const validator = (workObj) => {
    return workObj.workName && workObj.workTime && workObj.workColor;
  };
  const onSubmitWork = (event) => {
    event.preventDefault();
    const workName = event.target.workName.value;
    const workTime = parseInt(event.target.workTime.value);
    const workColor = event.target.workColor.value;
    const workObj = { workName, workTime, workColor };
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(workObj);
    if (willUpdate) {
      callback();
      setWorkList((workList) => [...workList, workObj]);
    }
  };
  return { workList, onSubmitWork };
};
