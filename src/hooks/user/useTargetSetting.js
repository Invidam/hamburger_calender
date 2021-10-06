import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";

export const useTargetSetting = (user, isLoginLoading) => {
  console.log("UPDATE SETTING HOOK USER: ");
  const [targetWorkTime, setTargetWorkTime] = useState(user ? 0 : -1);
  const [targetWakeHour, setTargetWakeHour] = useState(user ? 0 : -1);
  const [targetBedHour, setTargetBedHour] = useState(user ? 0 : -1);
  const [targetWakeMinute, setTargetWakeMinute] = useState(user ? 0 : -1);
  const [targetBedMinute, setTargetBedMinute] = useState(user ? 0 : -1);
  const [isSettingHookLoading, setLoad] = useState(true);
  const onChangeTargetWorkTime = (workTime) =>
    setTargetWorkTime(parseInt(workTime));
  const onChangeTargetWakeHour = (wakeHour) =>
    setTargetWakeHour(parseInt(wakeHour));
  const onChangeTargetBedHour = (bedHour) =>
    setTargetBedHour(parseInt(bedHour));
  const onChangeTargetWakeMinute = (wakeMinute) =>
    setTargetWakeMinute(parseInt(wakeMinute));
  const onChangeTargetBedMinute = (bedMinute) =>
    setTargetBedMinute(parseInt(bedMinute));

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
      targetTimeObj.targetWorkTime &&
      targetTimeObj.targetWakeTime.hour &&
      targetTimeObj.targetBedTime.hour &&
      targetTimeObj.targetWakeTime.minute &&
      targetTimeObj.targetBedTime.minute
    );
  };
  const onEditTargetTime = (event) => {
    event.preventDefault();
    let willUpdate = true;
    const targetTimeObj = {
      targetWorkTime,
      targetWakeTime: { hour: targetWakeHour, minute: targetWakeMinute },
      targetBedTime: { hour: targetBedHour, minute: targetBedMinute },
    };
    if (typeof validator === "function") willUpdate = validator(targetTimeObj);
    if (willUpdate) {
      APIv2.userSetting(user).edit(targetTimeObj);
      // API.post(`/auth/setting/${user}`, {
      //   value: targetTimeObj,
      //   user,
      // });
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
      alert(errText);
    }
  };
  const targetTimeObj = {
    targetWorkTime,
    targetWakeTime: { hour: targetWakeHour, minute: targetWakeMinute },
    targetBedTime: { hour: targetBedHour, minute: targetBedMinute },
  };
  return {
    onEditTargetTime,
    targetWorkTime,
    onChangeTargetWorkTime,
    targetTimeObj,
    targetWakeHour,
    targetBedHour,
    targetWakeMinute,
    targetBedMinute,
    onChangeTargetWakeHour,
    onChangeTargetBedHour,
    onChangeTargetWakeMinute,
    onChangeTargetBedMinute,
    isSettingHookLoading,
  };
};
