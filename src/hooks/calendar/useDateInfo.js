import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";
import { isEqualYYYYMMDateStr } from "../../tools/time";
let befDate;

export const useDateInfo = (user, date) => {
  const [dateInfo, setDateInfo] = useState();
  const [activeDate, setActiveDate] = useState();
  const [isDateInfoLoad, setLoad] = useState(true);

  const getUserInfo = async (nextDate) => {
    try {
      console.log("GET USER IFNO START");
      setLoad(true);
      const data = await APIv2.workList(user, nextDate).dataInfo();
      if (!data?.data) throw new Error("Cannot found Your Work List");
      setDateInfo(data?.data);
      setLoad(false);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    let nextDate = befDate === date ? (activeDate ? activeDate : date) : date;
    console.log(
      "BEF: ",
      befDate,
      "CURR: ",
      nextDate,
      activeDate,
      date,
      user,
      !befDate || !isEqualYYYYMMDateStr(befDate, nextDate)
    );
    if (user && (!befDate || !isEqualYYYYMMDateStr(befDate, nextDate)))
      getUserInfo(nextDate);
    befDate = nextDate;
    if (!user) setDateInfo([]);
  }, [user, date, activeDate]);
  return [dateInfo, isDateInfoLoad, setActiveDate];
};
