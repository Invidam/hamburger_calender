import { useEffect, useState } from "react";
import { API, APIv2 } from "../../tools/API";
import { isEqualYYYYMMDateStr } from "../../tools/time";
let cancel = false;
export const useDateInfo = (user, date) => {
  const [dateInfo, setDateInfo] = useState();

  // const [activeDate, setActiveDate] = useState(undefined);
  // const [isDateInfoLoad, setLoad] = useState(true);

  const getUserInfo = async (nextDate) => {
    try {
      console.log("info, CANCEL?", cancel);
      if (!nextDate) return;
      if (cancel) return;
      // console.log("info, NOT CANCEL");
      if (user) {
        // setLoad(true);
        const data = await APIv2.workList(user, nextDate).dataInfo();
        // setLoad(false);
        if (!data?.data) throw new Error("Cannot found Your Work List");
        const response = data.data;
        console.log("USER INFO SETTING STRAT", nextDate, response);
        setDateInfo(response);
      } else {
        // setDateInfo();
      }
    } catch (error) {
      // setDateInfo();
      alert(error);
    }
  };
  useEffect(() => {
    console.log("DATE INFO GET", user, date);
    getUserInfo(date);

    return () => (cancel = true);
  }, [user, date]);
  return [dateInfo, getUserInfo];
};
