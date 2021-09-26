import { useState } from "react";

export const usePushWork = (workList, setWorkList, callback) => {
  const [workColor, setColor] = useState();
  const [workName, setWorkName] = useState();
  const [workTime, setWorkTime] = useState();
  const hexToRgba = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return "rgba(" + r + "," + g + "," + b + ", 1)";
  };
  const onChangeWorkColor = (color) => {
    if (!color) {
    } else if (color.substr(0, 1) === "#") {
      color = hexToRgba(color);
    }
    setColor(color);
  };
  const onChangeWorkName = (name) => setWorkName(name);
  const onChangeWorkTime = (time) => setWorkTime(parseInt(time));
  const validator = (workObj) => {
    return workObj.workName && workObj.workTime && workObj.workColor;
  };
  const onSubmitWork = (event) => {
    event.preventDefault();
    // const workName = event.target.workName.value;
    // const workTime = parseInt(event.target.workTime.value);
    const workObj = { workName, workTime, workColor };
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(workObj);
    if (willUpdate) {
      callback();
      console.log("work:ist: ", workList);
      if (!workList || workList[0]?.workTime === -1) setWorkList([workObj]);
      else setWorkList([...workList, workObj]);
    } else {
      let errText = `[ERROR] ${workName ? "" : "WorkName"}${
        !workTime + !workColor > 0 && !workName ? ", " : ""
      }${workTime ? "" : "WorkTime"}${!workColor > 0 && !workTime ? ", " : ""}${
        workColor ? "" : "WorkColor"
      } ${!workName + !workTime + !workColor > 1 ? "are" : "is"} not entered.`;
      alert(errText);
    }
  };
  return {
    onChangeWorkColor,
    onChangeWorkName,
    onChangeWorkTime,
    onSubmitWork,
  };
};
