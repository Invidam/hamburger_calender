import Calendar from "react-calendar";
import { changeFormatYYYYMMDD, getToday, UTCtoKTC } from "../../tools/time";
import "../../css/calendar.css";
import { useEffect } from "react";
export const CalendarTemplate = ({
  user,
  updateDateHook,
  wakeTimeHook,
  bedTimeHook,
  updateWorkHook,
}) => {
  const clickDay = (event, date) => alert("Clicked day: ", date);
  const [date, onUpdateDate] = updateDateHook;

  const [wakeTime, onClickWakeTime, updateWakeTime] = wakeTimeHook;
  const [bedTime, onClickBedTime, updateBedTime] = bedTimeHook;
  const [workList, setWorkList] = updateWorkHook;
  const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  return (
    <article>
      <Calendar
        className="caldendar"
        onChange={onUpdateDate}
        value={date}
        locale={"en"}
        calendarType={"US"}
        onClickDay={(date, event) => {
          const localDateObj = {
            today: getToday(),
            clickedDate: UTCtoKTC(date),
          };
          localStorage.setItem("date", JSON.stringify(localDateObj));
          //날짜와 user에 따라 DB를 확인하고, workList, recrodTime을 가져와 갱신한다. [추후 다른 데이터들도 동일하게 처리한다.]
          // window.localStorage.removeItem("wakeTime");
          // window.localStorage.removeItem("bedTime");
          // window.localStorage.removeItem("workList");
          // updateWakeTime();
          // updateBedTime();
          // setWorkList([]);
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
