import Calendar from "react-calendar";
import { changeFormatYYYYMMDD } from "../../tools/time";
import "../../css/calendar.css";
import { useDateInfo } from "../../hooks/calendar/useDateInfo";
import { NotLoggedInPage } from "../pages/NotLoggedInPage";
export const CalendarTemplate = ({ user, updateDateHook }) => {
  const [date, onUpdateDate] = updateDateHook;
  const [mark, getUserInfo] = useDateInfo(user, date);
  // const mark = dateInfo[0];
  console.log("[Calendar] TEMPLATE");
  // return isDateInfoLoad ? (
  //   <article>
  //     {" "}
  //     <LoadingElement text={"Calendar Loading"} />
  //   </article>
  // ) :
  return !user ? (
    <NotLoggedInPage elementName={"Week Calendar"} />
  ) : (
    <div className="calendar-template">
      <h1 className="calendar-header">Check your calendar</h1>
      <Calendar
        className="caldendar"
        onChange={onUpdateDate}
        value={new Date(date)}
        locale={"en"}
        calendarType={"US"}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
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
    </div>
  );
};
