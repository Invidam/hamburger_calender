import { useState } from "react";

export const usePushWork = (workList, setWorkList, callback) => {
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
    } else if (color.substr(0, 1) === "#") {
      color = hexToRgba(color);
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
      // workList.push(workObj);
      setWorkList([...workList, workObj]);
    } else {
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
