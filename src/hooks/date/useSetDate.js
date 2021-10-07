import { useState } from "react";
import { changeFormatYYYYMMDD, getToday } from "../../tools/time";

export const useSetDate = () => {
  const today = getToday();
  let localDateObj;
  if (localStorage.getItem("date"))
    localDateObj = JSON.parse(localStorage.getItem("date"));
  // console.log(localDateObj);
  const initVal = changeFormatYYYYMMDD(
    localDateObj && localDateObj.today === today
      ? new Date(localDateObj.clickedDate)
      : new Date()
  );
  // console.log(initVal, typeof initVal, new Date());
  const [date, setDate] = useState(initVal);
  const onUpdateDate = (dateObj) => setDate(changeFormatYYYYMMDD(dateObj));
  return [date, onUpdateDate];
};
