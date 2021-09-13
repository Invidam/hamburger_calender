import axios from "axios";
import { useState, useEffect } from "react";

export const useRecordTime = (key) => {
  const initVal = window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key))
    : null;
  console.log("INIT VAL: ", initVal);
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
      console.log("HOOK DATA: ", key, data?.data);
      if (data?.data) {
        setRecordTime(data?.data);
        window.localStorage.setItem(key, JSON.stringify(data?.data));
      }
    });
  const onClick = (event) => {
    event.preventDefault();
    const [hour, minute] = new Date()
      .toTimeString()
      .split(":")
      .slice(0, 2)
      .map((numChar) => parseInt(numChar));
    console.log("on CLick, ", hour, minute);
    const timeObj = { hour, minute };
    axios.post("/api/record-time", { user: "TEST", key, value: timeObj });
    window.localStorage.setItem(key, JSON.stringify(timeObj));
    setRecordTime(timeObj);
  };
  return [recordTime, onClick];
};
