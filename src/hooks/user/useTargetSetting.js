import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";
const makeTargetSetting = (
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
const makeEmptySetting = () => makeTargetSetting(-1, -1, -1, -1, -1);
export const useTargetSetting = (user, isLoginLoading) => {
  console.log("UPDATE SETTING HOOK USER: ", user, isLoginLoading);
  const [targetSetting, setTargetSetting] = useState(makeEmptySetting());
  // const [targetWorkTime, setTargetWorkTime] = useState(-1);
  // const [targetWakeHour, setTargetWakeHour] = useState(-1);
  // const [targetBedHour, setTargetBedHour] = useState(-1);
  // const [targetWakeMinute, setTargetWakeMinute] = useState(-1);
  // const [targetBedMinute, setTargetBedMinute] = useState(-1);
  const [isSettingHookLoading, setLoad] = useState(true);
  const getUserSetting = async () => {
    try {
      console.log("SETTING USE EFFECT : ", user, isLoginLoading);
      if (user && !isLoginLoading) {
        console.log("SETTIN-G", user);
        // setLoad(true);
        const data = await APIv2.userSetting(user).get(); //API.get(`/auth/setting/${user}`);
        const settingObj = data?.data;
        if (!data) throw new Error("Cannot find data");
        setTargetSetting(settingObj);
        setLoad(false);
        // setTargetWorkTime(settingObj?.targetWorkTime);
        // setTargetWakeHour(settingObj?.targetWakeTime.hour);
        // setTargetBedHour(settingObj?.targetBedTime.hour);
        // setTargetWakeMinute(settingObj?.targetWakeTime.minute);
        // setTargetBedMinute(settingObj?.targetBedTime.minute);
      } else {
        if (!isLoginLoading) setLoad(false);
        //
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

  const validator = (targetSetting) => {
    return (
      targetSetting.targetWorkTime !== -1 &&
      targetSetting.targetWakeTime.hour !== -1 &&
      targetSetting.targetBedTime.hour !== -1 &&
      targetSetting.targetWakeTime.minute !== -1 &&
      targetSetting.targetBedTime.minute !== -1
    );
  };
  const setTargetTime = (targetSetting) => {
    try {
      let willUpdate = true;
      console.log("EDIT TARGET");
      if (typeof validator === "function")
        willUpdate = validator(targetSetting);
      if (willUpdate) {
        console.log("API START~~");
        APIv2.userSetting(user).edit(targetSetting);
        setTargetSetting(targetSetting);
        // setTargetWorkTime(targetSetting?.targetWorkTime);
        // setTargetWakeHour(targetSetting?.targetWakeTime.hour);
        // setTargetBedHour(targetSetting?.targetBedTime.hour);
        // setTargetWakeMinute(targetSetting?.targetWakeTime.minute);
        // setTargetBedMinute(targetSetting?.targetBedTime.minute);
      } else {
        const targetWakeTime =
          targetSetting?.targetWakeHour && targetSetting?.targetWakeMinute;
        const targetBedTime =
          targetSetting?.targetBedHour && targetSetting?.targetBedMinute;
        let errText = `[ERROR] ${
          targetSetting?.targetWorkTime ? "" : "TargetWorkTime"
        }${
          !targetSetting?.targetWakeTime + !targetSetting?.targetBedTime > 0 &&
          !targetSetting?.targetWorkTime
            ? ", "
            : ""
        }${targetSetting?.targetWakeTime ? "" : "TargetWakeTime"}${
          !targetSetting?.targetBedTime > 0 && !targetSetting?.targetWakeTime
            ? ", "
            : ""
        }${targetSetting?.targetBedTime ? "" : "TargetBedtime"} ${
          !targetSetting?.targetWorkTime +
            !targetSetting?.targetWakeTime +
            !targetSetting?.targetBedTime >
          1
            ? "are"
            : "is"
        } not entered.`;
        throw new Error(errText);
      }
    } catch (error) {
      alert(error);
    }
  };
  // const targetSetting = makeTargetSetting(
  //   targetWorkTime,
  //   targetWakeHour,
  //   targetBedHour,
  //   targetWakeMinute,
  //   targetBedMinute
  // );
  return {
    setTargetTime,
    targetSetting,
    isSettingHookLoading,
  };
};
