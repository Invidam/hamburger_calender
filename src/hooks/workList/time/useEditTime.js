import { useState } from "react";

export const useEditTime = (recordTime, updateRecordTime, isWake, callback) => {
  const [hour, setHour] = useState(recordTime.hour);
  const [minute, setMinute] = useState(recordTime.minute);
  const validator = (timeObj) => {
    return timeObj.hour && timeObj.minute;
  };
  const onChangeHour = (hour) => setHour(hour);
  const onChangeMinute = (minute) => setMinute(parseInt(minute));
  const onEditRecordTime = (event) => {
    event.preventDefault();
    const timeObj = { hour, minute };
    let willUpdate = true;
    if (typeof validator === "function") willUpdate = validator(timeObj);
    if (willUpdate) {
      callback();
      updateRecordTime(timeObj);
    } else {
      let errText = `${isWake ? "WakeTime" : "BedTime"} is not entered.`;
      alert(errText);
    }
  };
  return { onChangeHour, onChangeMinute, onEditRecordTime };
};
