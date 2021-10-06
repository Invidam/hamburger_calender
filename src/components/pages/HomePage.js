// import logo from '../logo.svg';
// import "../../css/App.css";
import { WorkListTemplate } from "../worklist/WorkListTemplate";
import "../../css/calendar.css";
import { CalendarTemplate } from "../calendar/CalendarTemplate";
import { useRecordTime } from "../../hooks/workList/time/useRecordTime";
import { useWorkList } from "../../hooks/workList/work/useWorkList";
import { changeFormatYYYYMMDD } from "../../tools/time";
import { API } from "../../tools/API";

export const HomePage = ({ user, updateDateHook, targetTimeObj }) => {
  // const [date, setDate] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  // const updateDateHook = useState(new Date());
  const date = changeFormatYYYYMMDD(updateDateHook[0], false);

  return (
    <section>
      <article>{`Hello ${user}`}</article>
      <article>
        <WorkListTemplate
          user={user}
          date={date}
          targetTimeObj={targetTimeObj}
        />
      </article>
    </section>
  );
};
