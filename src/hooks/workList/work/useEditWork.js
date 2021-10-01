import { useState } from "react";
import { API } from "../../../tools/API";

export const useEditWork = (workItem, setWork, callback) => {
  const { id } = workItem;
  const [workColor, setColor] = useState(workItem.workColor);
  const [workName, setWorkName] = useState(workItem.workName);
  const [workTime, setWorkTime] = useState(workItem.workTime);

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
  const validator = (workItem) => {
    return workItem.workName && workItem.workTime && workItem.workColor;
  };
  const editWorkItem = async (workItem) => await setWork(workItem).edit();

  const getErrText = () => {
    let errText = `[ERROR] ${workName ? "" : "WorkName"}${
      !workTime + !workColor > 0 && !workName ? ", " : ""
    }${workTime ? "" : "WorkTime"}${!workColor > 0 && !workTime ? ", " : ""}${
      workColor ? "" : "WorkColor"
    } ${!workName + !workTime + !workColor > 1 ? "are" : "is"} not entered.`;
    return errText;
  };
  const onEditWork = (event) => {
    try {
      event.preventDefault();
      const workItem = { workName, workTime, workColor, id };
      console.log("EIDT WORK", workItem);
      let willUpdate = true;
      if (typeof validator === "function") willUpdate = validator(workItem);
      if (willUpdate) {
        callback();
        editWorkItem(workItem);
      } else {
        throw new Error(getErrText());
      }
    } catch (error) {
      alert(error);
    }
  };
  return { onChangeWorkColor, onChangeWorkName, onChangeWorkTime, onEditWork };
};
