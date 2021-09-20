import axios from "axios";
import { useState, useEffect } from "react";
import { getToday } from "../../../tools/time";
let cnt = 0;
const getEmptyTimeObj = () => {
  return { hour: -1, minute: -1 };
};

export const isEmptyTimeObj = (timeObj) =>
  !timeObj || timeObj.hour === -1 || timeObj.minute === -1;

const checkTimeObj = (timeObj) =>
  isEmptyTimeObj(timeObj) ? getEmptyTimeObj() : timeObj;

export const useUpdateTime = (key, user, date) => {
  const initVal =
    !user && window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key))
      : null;
  const [recordTime, setRecordTime] = useState();
  // setRecordTime(initVal);
  useEffect(() => {
    getAndUpdateRecordTime();
  }, [date]);

  const getAndUpdateRecordTime = async () => {
    const data = await axios.get(
      `/api/${user}/${date}/worklist/record-time/${key}`
    );
    const resTimeObj = checkTimeObj(data?.data);
    // window.localStorage.setItem(key, JSON.stringify(data?.data));
    setRecordTime(resTimeObj);
  };

  const updateRecordTime = (timeObj) => {
    timeObj = checkTimeObj(timeObj);

    axios.post(`/api/${user}/${date}/worklist/record-time/${key}`, {
      value: timeObj,
    });
    // window.localStorage.setItem(key, JSON.stringify(timeObj));
    setRecordTime(timeObj);
  };
  const onClick = (event) => {
    event.preventDefault();
    const [hour, minute] = new Date()
      .toTimeString()
      .split(":")
      .slice(0, 2)
      .map((numChar) => parseInt(numChar));
    const timeObj = { hour, minute };
    updateRecordTime(timeObj);
  };
  return [recordTime, onClick, updateRecordTime];
};
