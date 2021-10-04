import { useState, useEffect } from "react";
import { APIv2 } from "../../../tools/API";
import { LocalStroage } from "../../../tools/LocalStorage";
// import { getToday } from "../../../tools/time";

export const isEmptyTimeObj = (timeObj) =>
  timeObj ? !Object.keys(timeObj).length : true;
// !timeObj || timeObj.hour === -1 || timeObj.minute === -1;

const getEmptyTimeObj = () => {
  return {};
};

const checkTimeObj = (timeObj) =>
  isEmptyTimeObj(timeObj) ? getEmptyTimeObj() : timeObj;
// const getInitList = (user, key) =>
//   !user && window.localStorage.getItem(key)
//     ? JSON.parse(window.localStorage.getItem(key))
//     : null;

const getNowTimeHHMM = () =>
  new Date()
    .toTimeString()
    .split(":")
    .slice(0, 2)
    .map((numChar) => parseInt(numChar));
export const useRecordTime = (key, user, date) => {
  // const initVal = getInitList(user, key);
  const [recordTime, setRecordTime] = useState();
  const [isRecordTimeLoading, setLoad] = useState(true);

  const getRecordTime = async () => {
    try {
      let resTimeObj;
      if (user) {
        const data = await APIv2.recordTime(user, date, key).get();
        resTimeObj = checkTimeObj(data?.data);
        console.log("USERECORDTIME, data catch");
        console.log("USERECORDTIME DATA CATCH AFT");
        setRecordTime(resTimeObj);
      } else {
        resTimeObj = LocalStroage.recordTime(key).get();
        console.log("USERECORDTIME DATA CATCH AFT");
        setRecordTime(resTimeObj);
      }
      if (isRecordTimeLoading) setLoad(false);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    console.log("GET RECORD TIME START");
    getRecordTime();
  }, [date, user]);

  const setTime = (timeObj) => {
    timeObj = checkTimeObj(timeObj);
    return {
      create: async () => {
        setRecordTime(timeObj);
        if (user) await APIv2.recordTime(user, date, key).create(timeObj);
        else LocalStroage.recordTime(key).set(timeObj);
      },
      edit: async () => {
        setRecordTime(timeObj);
        if (user) await APIv2.recordTime(user, date, key).edit(timeObj);
        else LocalStroage.recordTime(key).set(timeObj);
      },
      delete: async () => {
        setRecordTime({});
        if (user) await APIv2.recordTime(user, date, key).delete();
        else LocalStroage.recordTime(key).set({});
      },
    };
    //
    // if (user)
    //   API.post(`/api/${user}/${date}/worklist/record-time/${key}`, {
    //     value: timeObj,
    //   });
    // else window.localStorage.setItem(key, JSON.stringify(timeObj));
    // setRecordTime(timeObj);
  };
  const onClick = (event) => {
    console.log("ONCLICK RECORDTIME");
    event.preventDefault();
    const [hour, minute] = getNowTimeHHMM();
    const timeObj = { hour, minute };
    setTime(timeObj).create();
  };
  return [recordTime, onClick, setTime, isRecordTimeLoading];
};
