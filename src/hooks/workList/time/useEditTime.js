export const useEditTime = (recordTime, updateRecordTime, isWake, callback) => {
  const validator = (timeObj) => {
    return timeObj.hour && timeObj.minute;
  };
  const onEditRecordTime = (event, idx) => {
    event.preventDefault();
    const hour = parseInt(event.target.hour.value);
    const minute = parseInt(event.target.minute.value);
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
  return { onEditRecordTime };
};
