import axios from "axios";
import { useState } from "react";

export const useRecordTime = (key) => {
  const initVal = window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
  const [recordTime, setRecordTime] = useState(initVal);
  const onClick = (event) => {
    event.preventDefault();
    const [hour, minute] = new Date()
      .toTimeString()
      .split(":")
      .slice(0, 2)
      .map((numChar) => parseInt(numChar));
    console.log("on CLick, ", hour, minute);
    const timeObj = { hour, minute };
    window.localStorage.setItem(key, JSON.stringify(timeObj));
    axios.post("api/world", { key: timeObj });
    setRecordTime(timeObj);
  };
  return [recordTime, onClick];
};
