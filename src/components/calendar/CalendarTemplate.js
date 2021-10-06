import Calendar from "react-calendar";
import { changeFormatYYYYMMDD, getToday, UTCtoKTC } from "../../tools/time";
import "../../css/calendar.css";
import axios from "axios";
import { useDateInfo } from "../../hooks/calendar/useDateInfo";
import { LoadingElement } from "../Loading";
export const CalendarTemplate = ({ user, updateDateHook }) => {
  // const clickDay = (event, date) => alert("Clicked day: ", date);
  let [date, onUpdateDate] = updateDateHook;
  const [mark, isDateInfoLoad, setActiveDate] = useDateInfo(
    user,
    changeFormatYYYYMMDD(date)
  );
  // console.log("DATE INFO: ", dateInfo);
  // const mark = dateInfo[0];
  console.log("[Calendar]");
  // return isDateInfoLoad ? (
  //   <article>
  //     {" "}
  //     <LoadingElement text={"Calendar Loading"} />
  //   </article>
  // ) :
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
        }}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
          console.log("Changed view to: ", activeStartDate, value, view);

          setActiveDate(changeFormatYYYYMMDD(activeStartDate));
        }}
        tileClassName={({ date, view }) => {
          if (
            mark &&
            mark.find((markedDate) => markedDate === changeFormatYYYYMMDD(date))
          )
            return "highlight";
        }}
        //DB에 있는 날짜는 체크표시 해야함.
      />
    </article>
  );
};
