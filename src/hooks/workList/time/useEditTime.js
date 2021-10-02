import { useState } from "react";

export const useEditTime = (recordTime, setTime, isWake, callback) => {
  const [hour, setHour] = useState(recordTime.hour);
  const [minute, setMinute] = useState(recordTime.minute);
  const validator = (timeObj) => {
    return timeObj.hour && timeObj.minute;
  };
  const onChangeHour = (hour) => setHour(hour);
  const onChangeMinute = (minute) => setMinute(parseInt(minute));
  const getErrText = () => `${isWake ? "WakeTime" : "BedTime"} is not entered.`;
  const editTime = async (timeObj) => await setTime(timeObj).edit();
  const onEditRecordTime = (event) => {
    try {
      event.preventDefault();
      const timeObj = { hour, minute };
      let willUpdate = true;
      if (typeof validator === "function") willUpdate = validator(timeObj);
      if (willUpdate) {
        callback();
        editTime(timeObj);
      } else {
        throw new Error(getErrText());
      }
    } catch (error) {
      alert(error);
    }
  };
  return { onChangeHour, onChangeMinute, onEditRecordTime };
};
