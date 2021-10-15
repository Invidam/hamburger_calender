import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";
import { isEqualYYYYMMDateStr } from "../../tools/time";
let befDate;

export const useDateInfo = (user, date) => {
  const [dateInfo, setDateInfo] = useState();

  const [activeDate, setActiveDate] = useState();
  // const [isDateInfoLoad, setLoad] = useState(true);

  const getUserInfo = async (nextDate) => {
    try {
      if (user) {
        // setLoad(true);
        const data = await APIv2.workList(user, nextDate).dataInfo();
        // setLoad(false);
        if (!data?.data) throw new Error("Cannot found Your Work List");
        const response = data.data;

        setDateInfo(response);
      } else {
        setDateInfo([]);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    let nextDate = activeDate ? activeDate : date;
    console.log(
      befDate,
      "CURR: ",
      nextDate,
      activeDate,
      date,
      user,
      !befDate || !isEqualYYYYMMDateStr(befDate, nextDate)
    );
    getUserInfo(nextDate);
    // if (user) befDate = nextDate;
  }, [user, date, activeDate]);
  useEffect(() => {}, [dateInfo]);
  return [dateInfo, setActiveDate];
};
