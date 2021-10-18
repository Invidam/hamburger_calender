import Calendar from "react-calendar";
import { changeFormatYYYYMMDD, getToday, UTCtoKTC } from "../../tools/time";
import "../../css/calendar.css";
import axios from "axios";
import { useDateInfo } from "../../hooks/calendar/useDateInfo";
import { LoadingElement } from "../Loading";
import { LocalStroage } from "../../tools/LocalStorage";
export const CalendarTemplate = ({ user, updateDateHook }) => {
  const [date, onUpdateDate] = updateDateHook;
  const [mark, getUserInfo] = useDateInfo(user, date);
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
      {`mark: ${mark}`}
      <Calendar
        className="caldendar"
        onChange={(value) => {
          console.log("CHANGE EVENT", value);
          onUpdateDate(value);
          console.log("value:", value);
          // onUpdateDate(value);
        }}
        value={new Date(date)}
        locale={"en"}
        calendarType={"US"}
        // onClickDay={(date, event) => {
        //   console.log("CLICK EVENT", date);
        // }}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
          console.log("Changed view to: ", activeStartDate, value, view);

          // setActiveDate(changeFormatYYYYMMDD(activeStartDate));
          getUserInfo(changeFormatYYYYMMDD(activeStartDate));
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
