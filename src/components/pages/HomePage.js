// import logo from '../logo.svg';
// import "../../css/App.css";
import { WorkListTemplate } from "../worklist/WorkListTemplate";
import "../../css/calendar.css";
import { CalendarTemplate } from "../calendar/CalendarTemplate";
import { useRecordTime } from "../../hooks/workList/time/useRecordTime";
import { useWorkList } from "../../hooks/workList/work/useWorkList";
import { changeFormatYYYYMMDD } from "../../tools/time";

export const HomePage = ({ user, updateDateHook, targetTimeObj }) => {
  // const [date, setDate] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  // const updateDateHook = useState(new Date());
  const date = changeFormatYYYYMMDD(updateDateHook[0], false);
  const wakeTimeHook = useRecordTime("wakeTime", user, date);
  const bedTimeHook = useRecordTime("bedTime", user, date);
  const workListHook = useWorkList(user, date);
  const isLoading = () =>
    wakeTimeHook[0] === "Loading" ||
    bedTimeHook[0] === "Loading" ||
    workListHook[0] === "Loading";
  console.log("[HOME] , ", user, date, updateDateHook[0]);
  console.log(
    "HOME, LOADING CHECK",
    "WAKE",
    wakeTimeHook[0],
    "BED",
    bedTimeHook[0],
    "WORK",
    workListHook[0],
    isLoading()
  );
  return isLoading() ? (
    <h1>LOADING</h1>
  ) : (
    <section>
      <article>
        {`Hello ${user}`}
        <CalendarTemplate
          user={user}
          updateDateHook={updateDateHook}
          wakeTimeHook={wakeTimeHook}
          bedTimeHook={bedTimeHook}
          workListHook={workListHook}
        />
      </article>
      <article>
        <WorkListTemplate
          user={user}
          date={date}
          targetTimeObj={targetTimeObj}
          wakeTimeHook={wakeTimeHook}
          bedTimeHook={bedTimeHook}
          workListHook={workListHook}
        />
      </article>
    </section>
  );
};
