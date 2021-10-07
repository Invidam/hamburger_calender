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
export const useTargetSettingOnPage = ({ targetTimeObj, setTargetTime }) => {
  console.log("UPDATE SETTING PAGE HOOK USER: ", targetTimeObj);
  const [targetWorkTime, setTargetWorkTime] = useState(
    targetTimeObj?.targetWorkTime === -1
      ? undefined
      : targetTimeObj?.targetWorkTime
  );
  const [targetWakeHour, setTargetWakeHour] = useState(
    targetTimeObj?.targetWakeTime.hour === -1
      ? undefined
      : targetTimeObj?.targetWakeTime.hour
  );
  const [targetBedHour, setTargetBedHour] = useState(
    targetTimeObj?.targetBedTime.hour === -1
      ? undefined
      : targetTimeObj?.targetBedTime.hour
  );
  const [targetWakeMinute, setTargetWakeMinute] = useState(
    targetTimeObj?.targetWakeTime.minute === -1
      ? undefined
      : targetTimeObj?.targetWakeTime.minute
  );
  const [targetBedMinute, setTargetBedMinute] = useState(
    targetTimeObj?.targetBedTime.minute === -1
      ? undefined
      : targetTimeObj?.targetBedTime.minute
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
      makeTargetTimeObj(
        targetWorkTime,
        targetWakeHour,
        targetBedHour,
        targetWakeMinute,
        targetBedMinute
      )
    );
  };
  const displayObj = makeTargetTimeObj(
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
