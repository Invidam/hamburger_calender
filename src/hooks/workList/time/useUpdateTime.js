import axios from "axios";
import { useState, useEffect } from "react";

export const useUpdateTime = (key) => {
  const initVal = window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
  const [recordTime, setRecordTime] = useState(initVal);
  if (!recordTime)
    axios({
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      url: "/api/get-time",
      method: "post",
      data: { user: "TEST", key },
    }).then((data) => {
      if (data?.data) {
        setRecordTime(data?.data);
        window.localStorage.setItem(key, JSON.stringify(data?.data));
      }
    });
  const updateRecordTime = (timeObj) => {
    if (timeObj) {
      axios.post("/api/record-time", { user: "TEST", key, value: timeObj });
      window.localStorage.setItem(key, JSON.stringify(timeObj));
      setRecordTime(timeObj);
    } else {
      timeObj = { hour: -1, minute: -1 };
      axios.post("/api/record-time", { user: "TEST", key, value: timeObj });
      window.localStorage.setItem(key, JSON.stringify(timeObj));
      setRecordTime(timeObj);
    }
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
