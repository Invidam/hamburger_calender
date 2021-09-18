import Calendar from "react-calendar";
import { changeFormatYYYYMMDD, UTCtoKTC } from "../../tools/time";
import "../../css/calendar.css";
import { useState } from "react";
import { useUpdateTime } from "../../hooks/workList/time/useUpdateTime";
export const CalendarTemplate = () => {
  const [value, onChange] = useState(new Date());
  const clickDay = (event, value) => alert("Clicked day: ", value);

  const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  return (
    <article>
      <Calendar
        className="caldendar"
        onChange={onChange}
        value={value}
        locale={"en"}
        calendarType={"US"}
        onClickDay={(value, event) => {
          console.log("Clic123ked day: ", value, changeFormatYYYYMMDD(value));
          const timeObj = {
            hour: parseInt(changeFormatYYYYMMDD(value).substr(5, 2), 10),
            minute: parseInt(changeFormatYYYYMMDD(value).substr(8, 2), 10),
          };
          window.localStorage.setItem("wakeTime", JSON.stringify(timeObj));
        }}
        tileClassName={({ date, view }) => {
          if (
            mark.find((markedDate) => markedDate === changeFormatYYYYMMDD(date))
          )
            return "highlight";
          //data: Sun Sep 12 2021 00:00:00 GMT+0900 (한국 표준시)
          // if (mark.find((x) => x === date.format("DD-MM-YYYY"))) {
          //   return "highlight";
          // }
        }}
        //DB에 있는 날짜는 체크표시 해야함.
      />
    </article>
  );
};
