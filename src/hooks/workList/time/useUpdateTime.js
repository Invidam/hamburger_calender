import axios from "axios";
import { useState, useEffect } from "react";
import { getToday } from "../../../tools/time";

export const useUpdateTime = (key, user, date) => {
  console.log("UPDATE TIME HOOK DATE: ", date, getToday());
  // if (getToday() !== date) window.localStorage.removeItem(key);
  const initVal = window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
  if (key === "wakeTime") console.log("UPDATE TIME HOOK INIT VAL", initVal);
  const [recordTime, setRecordTime] = useState(initVal);
  // setRecordTime(initVal);
  useEffect(() => {
    console.log("DATE CHANG================", date);
    setRecordTime(initVal);
  }, [date]);
  if (key === "wakeTime")
    console.log("UPDATE TIME HOOK RECRORD TIME", recordTime);
  const axiosSync = async () => {
    console.log("AXIOS START");
    const data = await axios({
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      url: `/api/${user}/${date}/worklist/record-time/${key}`,
      method: "get",
    });
    if (data?.data && data?.data.hour !== -1) {
      setRecordTime(data?.data);
      window.localStorage.setItem(key, JSON.stringify(data?.data));
    }
  };
  if (!recordTime || recordTime.hour === -1) axiosSync();

  const updateRecordTime = (timeObj) => {
    if (!timeObj) timeObj = { hour: -1, minute: -1 };

    axios.post(`/api/${user}/${date}/worklist/record-time/${key}`, {
      value: timeObj,
    });
    window.localStorage.setItem(key, JSON.stringify(timeObj));
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
