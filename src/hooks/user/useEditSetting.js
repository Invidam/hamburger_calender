import { useEffect, useState } from "react";
import { API } from "../../tools/axiosSetting";

export const useEditSetting = ({ user, history, location }) => {
  const [targetWorkTime, setTargetWorkTime] = useState();
  const [targetWakeTime, setTargetWakeTime] = useState();
  const [targetBedTime, setTargetBedTime] = useState();

  const onChangeTargetWorkTime = (workTime) =>
    setTargetWorkTime(parseInt(workTime));
  const onChangeTargetWakeTime = (wakeTime) =>
    setTargetWakeTime(parseInt(wakeTime));
  const onChangeTargetBedTime = (bedTime) =>
    setTargetBedTime(parseInt(bedTime));

  const getAndUpdateSetting = async () => {
    try {
      const data = await API.get(`/auth/setting/${user}`);
      const settingObj = data?.data;
      if (!data) throw new Error("Cannot find data");
      console.log("SETTING DATA: ", settingObj);
      setTargetWorkTime(settingObj.targetWorkTime);
      setTargetWakeTime(settingObj.targetWakeTime);
      setTargetBedTime(settingObj.targetBedTime);
    } catch (error) {
      alert(error);
      // history.push("/setting");
    }
  };
  useEffect(() => {
    getAndUpdateSetting();
  }, [user]);

  const validator = (targetTimeObj) => {
    return (
      targetTimeObj.targetWorkTime &&
      targetTimeObj.targetWakeTime &&
      targetTimeObj.targetBedTime
    );
  };
  const onEditTargetTime = (event) => {
    event.preventDefault();
    let willUpdate = true;
    const targetTimeObj = { targetWorkTime, targetWakeTime, targetBedTime };
    if (typeof validator === "function") willUpdate = validator(targetTimeObj);
    if (willUpdate) {
      console.log("SUBMIT: ", targetTimeObj);

      API.post(`/auth/setting`, {
        value: targetTimeObj,
        user,
      });
    } else {
      let errText = `[ERROR] ${targetWorkTime ? "" : "TargetWorkTime"}${
        !targetWakeTime + !targetBedTime > 0 && !targetWorkTime ? ", " : ""
      }${targetWakeTime ? "" : "TargetWakeTime"}${
        !targetBedTime > 0 && !targetWakeTime ? ", " : ""
      }${targetBedTime ? "" : "TargetBedtime"} ${
        !targetWorkTime + !targetWakeTime + !targetBedTime > 1 ? "are" : "is"
      } not entered.`;
      alert(errText);
    }
  };
  return {
    targetWorkTime,
    targetWakeTime,
    targetBedTime,
    onChangeTargetWorkTime,
    onChangeTargetWakeTime,
    onChangeTargetBedTime,
    onEditTargetTime,
  };
};
