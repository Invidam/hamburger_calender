import { useState } from "react";

export const usePushWork = (callback) => {
  const initVal = window.localStorage.getItem("workList")
    ? JSON.parse(window.localStorage.getItem("workList"))
    : [];
  const [workList, setWorkList] = useState(initVal);
  const validator = (workObj) => {
    return workObj.workName && workObj.workTime && workObj.workColor;
  };
  let workColor;
  const hexToRgba = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return "rgba(" + r + "," + g + "," + b + ", 1)";
  };
  const onSubmitColor = (color) => {
    if (!color) {
      console.log("NO", color);
    } else if (color.substr(0, 1) === "#") {
      color = hexToRgba(color);
      console.log("HEX TO RGBA : ", color);
    }
    workColor = color;
  };
  const onSubmitWork = (event) => {
    event.preventDefault();
    const workName = event.target.workName.value;
    const workTime = parseInt(event.target.workTime.value);
    const workObj = { workName, workTime, workColor };
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(workObj);
    if (willUpdate) {
      callback();
      setWorkList((workList) => [...workList, workObj]);
    } else {
      console.log(workObj);
      console.log("NOT CHOOSED");
      let errText = `[ERROR] ${workName ? "" : "WorkName"}${
        !workTime + !workColor > 0 && !workName ? ", " : ""
      }${workTime ? "" : "WorkTime"}${!workColor > 0 && !workTime ? ", " : ""}${
        workColor ? "" : "WorkColor"
      } ${!workName + !workTime + !workColor > 1 ? "are" : "is"} not entered.`;
      alert(errText);
    }
  };
  return { workList, onSubmitColor, onSubmitWork };
};
