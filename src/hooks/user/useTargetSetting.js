import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";
const makeTargetTimeObj = (
  targetWorkTime,
  targetWakeHour,
  targetWakeMinute,
  targetBedHour,
  targetBedMinute
) => {
  return {
    targetWorkTime,
    targetWakeTime: { hour: targetWakeHour, minute: targetWakeMinute },
    targetBedTime: { hour: targetBedHour, minute: targetBedMinute },
  };
};
export const useTargetSetting = (user, isLoginLoading) => {
  console.log("UPDATE SETTING HOOK USER: ");
  const [targetWorkTime, setTargetWorkTime] = useState(-1);
  const [targetWakeHour, setTargetWakeHour] = useState(-1);
  const [targetBedHour, setTargetBedHour] = useState(-1);
  const [targetWakeMinute, setTargetWakeMinute] = useState(-1);
  const [targetBedMinute, setTargetBedMinute] = useState(-1);
  const [isSettingHookLoading, setLoad] = useState(true);
  const getUserSetting = async () => {
    try {
      if (user && !isLoginLoading) {
        console.log("SETTIN-G", user);
        const data = await APIv2.userSetting(user).get(); //API.get(`/auth/setting/${user}`);
        const settingObj = data?.data;
        if (!data) throw new Error("Cannot find data");
        setTargetWorkTime(settingObj?.targetWorkTime);
        setTargetWakeHour(settingObj?.targetWakeTime.hour);
        setTargetBedHour(settingObj?.targetBedTime.hour);
        setTargetWakeMinute(settingObj?.targetWakeTime.minute);
        setTargetBedMinute(settingObj?.targetBedTime.minute);
      } else {
        //
      }

      if (!isLoginLoading && isSettingHookLoading) {
        setLoad(false);
        console.log("SETTIN-G END", isSettingHookLoading);
      }
    } catch (error) {
      setLoad(false);
      alert(error);
      // history.push("/setting");
    }
  };
  useEffect(() => {
    getUserSetting();
  }, [user, isLoginLoading]);

  const validator = (targetTimeObj) => {
    return (
      targetTimeObj.targetWorkTime !== -1 &&
      targetTimeObj.targetWakeTime.hour !== -1 &&
      targetTimeObj.targetBedTime.hour !== -1 &&
      targetTimeObj.targetWakeTime.minute !== -1 &&
      targetTimeObj.targetBedTime.minute !== -1
    );
  };
  const setTargetTime = (targetTimeObj) => {
    try {
      let willUpdate = true;
      console.log("EDIT TARGET");
      if (typeof validator === "function")
        willUpdate = validator(targetTimeObj);
      if (willUpdate) {
        console.log("API START~~");
        APIv2.userSetting(user).edit(targetTimeObj);
        setTargetWorkTime(targetTimeObj?.targetWorkTime);
        setTargetWakeHour(targetTimeObj?.targetWakeTime.hour);
        setTargetBedHour(targetTimeObj?.targetBedTime.hour);
        setTargetWakeMinute(targetTimeObj?.targetWakeTime.minute);
        setTargetBedMinute(targetTimeObj?.targetBedTime.minute);
      } else {
        const targetWakeTime = targetWakeHour && targetWakeMinute;
        const targetBedTime = targetBedHour && targetBedMinute;
        let errText = `[ERROR] ${targetWorkTime ? "" : "TargetWorkTime"}${
          !targetWakeTime + !targetBedTime > 0 && !targetWorkTime ? ", " : ""
        }${targetWakeTime ? "" : "TargetWakeTime"}${
          !targetBedTime > 0 && !targetWakeTime ? ", " : ""
        }${targetBedTime ? "" : "TargetBedtime"} ${
          !targetWorkTime + !targetWakeTime + !targetBedTime > 1 ? "are" : "is"
        } not entered.`;
        throw new Error(errText);
      }
    } catch (error) {
      alert(error);
    }
  };
  const targetTimeObj = makeTargetTimeObj(
    targetWorkTime,
    targetWakeHour,
    targetBedHour,
    targetWakeMinute,
    targetBedMinute
  );
  return {
    setTargetTime,
    targetTimeObj,
    isSettingHookLoading,
  };
};
