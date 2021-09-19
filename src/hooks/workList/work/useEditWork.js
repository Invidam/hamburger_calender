import { useState } from "react";

export const useEditWork = (workList, setWorkList, idx, callback) => {
  const [workColor, setColor] = useState(
    workList.length > idx ? workList[idx].workColor : undefined
  );
  const [workName, setWorkName] = useState(
    workList.length > idx ? workList[idx].workName : undefined
  );
  const [workTime, setWorkTime] = useState(
    workList.length > idx ? workList[idx].workTime : undefined
  );

  const hexToRgba = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    return "rgba(" + r + "," + g + "," + b + ", 1)";
  };
  const onChangeWorkColor = (color) => {
    if (!color) {
      console.log("NO", color);
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
  const onEditWork = (event, idx) => {
    event.preventDefault();
    const workObj = { workName, workTime, workColor };
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(workObj);
    if (willUpdate) {
      callback();
      console.log("[EDIT] idx: ", idx, "obj: ", workObj);
      console.log("[EDIT]BEF WORKLIST", workList);
      const workListTemp = [...workList];
      workListTemp.splice(idx, 1, workObj);
      console.log("[EDIT]AFT WORKLIST", workListTemp);
      setWorkList(workListTemp);
    } else {
      let errText = `[ERROR] ${workName ? "" : "WorkName"}${
        !workTime + !workColor > 0 && !workName ? ", " : ""
      }${workTime ? "" : "WorkTime"}${!workColor > 0 && !workTime ? ", " : ""}${
        workColor ? "" : "WorkColor"
      } ${!workName + !workTime + !workColor > 1 ? "are" : "is"} not entered.`;
      alert(errText);
    }
  };
  return { onChangeWorkColor, onChangeWorkName, onChangeWorkTime, onEditWork };
};
