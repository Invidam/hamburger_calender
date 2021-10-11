import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";

const maketargetSetting = (
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
export const useTargetSettingOnPage = ({ targetSetting, setTargetTime }) => {
  console.log("UPDATE SETTING PAGE HOOK USER: ", targetSetting);
  const [targetWorkTime, setTargetWorkTime] = useState(
    targetSetting?.targetWorkTime === -1
      ? undefined
      : targetSetting?.targetWorkTime
  );
  const [targetWakeHour, setTargetWakeHour] = useState(
    targetSetting?.targetWakeTime.hour === -1
      ? undefined
      : targetSetting?.targetWakeTime.hour
  );
  const [targetBedHour, setTargetBedHour] = useState(
    targetSetting?.targetBedTime.hour === -1
      ? undefined
      : targetSetting?.targetBedTime.hour
  );
  const [targetWakeMinute, setTargetWakeMinute] = useState(
    targetSetting?.targetWakeTime.minute === -1
      ? undefined
      : targetSetting?.targetWakeTime.minute
  );
  const [targetBedMinute, setTargetBedMinute] = useState(
    targetSetting?.targetBedTime.minute === -1
      ? undefined
      : targetSetting?.targetBedTime.minute
  );
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

  const onEditTargetTime = (event) => {
    event.preventDefault();
    setTargetTime(
      maketargetSetting(
        targetWorkTime,
        targetWakeHour,
        targetBedHour,
        targetWakeMinute,
        targetBedMinute
      )
    );
  };
  const displayObj = maketargetSetting(
    targetWorkTime,
    targetWakeHour,
    targetBedHour,
    targetWakeMinute,
    targetBedMinute
  );
  console.log("DIS", displayObj);
  return {
    displayObj,
    onChangeTargetWorkTime,
    onChangeTargetWakeHour,
    onChangeTargetBedHour,
    onChangeTargetWakeMinute,
    onChangeTargetBedMinute,
    onEditTargetTime,
  };
};
