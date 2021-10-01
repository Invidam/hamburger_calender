import { useState, useEffect } from "react";
import { API } from "../../../tools/API";
import { getToday } from "../../../tools/time";
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
  const [recordTime, setRecordTime] = useState(initVal);

  const getAndUpdateRecordTime = async () => {
    let resTimeObj;
    if (user) {
      const data = await API.get(
        `/api/${user}/${date}/worklist/record-time/${key}`
      );
      resTimeObj = checkTimeObj(data?.data);
    } else resTimeObj = JSON.parse(window.localStorage.getItem(key));
    setRecordTime(resTimeObj);
  };
  useEffect(() => {
    getAndUpdateRecordTime();
  }, [date, user]);

  const updateRecordTime = (timeObj) => {
    timeObj = checkTimeObj(timeObj);
    if (user)
      API.post(`/api/${user}/${date}/worklist/record-time/${key}`, {
        value: timeObj,
      });
    else window.localStorage.setItem(key, JSON.stringify(timeObj));
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
