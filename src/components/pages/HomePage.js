// import logo from '../logo.svg';
// import "../../css/App.css";
import { WorkListTemplate } from "../worklist/WorkListTemplate";
import "../../css/calendar.css";
import { CalendarTemplate } from "../calendar/CalendarTemplate";
import { useUpdateTime } from "../../hooks/workList/time/useUpdateTime";
import { useWorkList } from "../../hooks/workList/work/useWorkList";
import { changeFormatYYYYMMDD } from "../../tools/time";

import { useState } from "react";
export const HomePage = ({ user, updateDateHook, targetTimeObj }) => {
  // const [date, setDate] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  // const updateDateHook = useState(new Date());
  const date = changeFormatYYYYMMDD(updateDateHook[0], false);
  const wakeTimeHook = useUpdateTime("wakeTime", user, date);
  const bedTimeHook = useUpdateTime("bedTime", user, date);
  const updateWorkHook = useWorkList(user, date);

  console.log("HOME , ", user, date, updateDateHook[0]);
  return (
    <section>
      <article>
        {`Hello ${user}`}
        <CalendarTemplate
          user={user}
          updateDateHook={updateDateHook}
          wakeTimeHook={wakeTimeHook}
          bedTimeHook={bedTimeHook}
          updateWorkHook={updateWorkHook}
        />
      </article>
      <article>
        <WorkListTemplate
          user={user}
          date={date}
          targetTimeObj={targetTimeObj}
          wakeTimeHook={wakeTimeHook}
          bedTimeHook={bedTimeHook}
          updateWorkHook={updateWorkHook}
        />
      </article>
    </section>
  );
};
