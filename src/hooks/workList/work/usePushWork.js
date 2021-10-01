import { useState } from "react";
import { API } from "../../../tools/API";
import randomToken from "rand-token";
export const usePushWork = ({ setWork, callback }) => {
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
  const validator = (workItem) => {
    return workItem.workName && workItem.workTime && workItem.workColor;
  };
  const pushWorkItem = async (workItem) => await setWork(workItem).create();

  const getErrText = () => {
    let errText = `[ERROR] ${workName ? "" : "WorkName"}${
      !workTime + !workColor > 0 && !workName ? ", " : ""
    }${workTime ? "" : "WorkTime"}${!workColor > 0 && !workTime ? ", " : ""}${
      workColor ? "" : "WorkColor"
    } ${!workName + !workTime + !workColor > 1 ? "are" : "is"} not entered.`;
    return errText;
  };
  const onSubmitWork = (event) => {
    try {
      event.preventDefault();
      // const workName = event.target.workName.value;
      // const workTime = parseInt(event.target.workTime.value);
      const id = Date.now().toString(16) + randomToken.generate(5);

      const workItem = { workName, workTime, workColor, id };
      let willUpdate = true;
      if (typeof validator === "function") willUpdate = validator(workItem);
      if (willUpdate) {
        callback();
        pushWorkItem(workItem);
      } else {
        throw new Error(getErrText());
      }
    } catch (error) {
      alert(error);
    }
  };
  return {
    onChangeWorkColor,
    onChangeWorkName,
    onChangeWorkTime,
    onSubmitWork,
  };
};
