import { useState } from "react";
import { LocalStroage } from "../../tools/LocalStorage";
import { changeFormatYYYYMMDD, getToday } from "../../tools/time";

export const useSetDate = () => {
  const today = getToday();
  let localDateObj;
  if (!LocalStroage.date().isEmpty()) localDateObj = LocalStroage.date().get();
  const initVal = changeFormatYYYYMMDD(
    localDateObj && localDateObj.today === today
      ? new Date(localDateObj.clickedDate)
      : new Date()
  );
  const [date, setDate] = useState(initVal);
  const onUpdateDate = (dateObj) => {
    console.log("[UPDATE DATE]:", dateObj, date);
    const localDateObj = {
      today: getToday(),
      clickedDate: changeFormatYYYYMMDD(dateObj),
    };
    LocalStroage.date().set(localDateObj);
    setDate(changeFormatYYYYMMDD(dateObj));
  };
  return [date, onUpdateDate];
};
