import { useState } from "react";
import { API } from "../../../tools/axiosSetting";

export const useEditWork = (
  workList,
  setWorkList,
  id,
  callback,
  user,
  date
) => {
  const [workColor, setColor] = useState(workList[id].workColor);
  const [workName, setWorkName] = useState(workList[id].workName);
  const [workTime, setWorkTime] = useState(workList[id].workTime);

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
  const editWork = (workObj) => {
    const workListTemp = workList;
    workListTemp[id] = workObj;
    console.log("Orig : ", workList);
    /*
    ORIG, TEMP가 똑같다. 다르게 해야 인식이 되서 변한다.
     */
    console.log("TEMP : ", workListTemp);
    setWorkList(workListTemp);
    const response = API.post(`/api/${user}/${date}/worklist/worklist`, {
      value: workObj,
    });
    console.log("PUSH RESPONSE", response);
  };
  const onEditWork = (event) => {
    event.preventDefault();
    const workObj = { workName, workTime, workColor, id };
    console.log("EIDT WORK", workObj);
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(workObj);
    if (willUpdate) {
      callback();
      editWork(workObj);
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
