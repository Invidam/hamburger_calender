// import logo from '../logo.svg';
// import "../../css/App.css";
import { WorkListTemplate } from "../worklist/WorkListTemplate";
import "../../css/calendar.css";
import { CalendarTemplate } from "../calendar/CalendarTemplate";
import { useUpdateTime } from "../../hooks/workList/time/useUpdateTime";
import { useUpdateWork } from "../../hooks/workList/work/useUpdateWork";
import { changeFormatYYYYMMDD } from "../../tools/time";

import { useState } from "react";
const USER = "TEST";
export const HomePage = ({ user }) => {
  // const [value, onChange] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  const updateDateHook = useState(new Date());
  const date = changeFormatYYYYMMDD(updateDateHook[0]);
  console.log("DATE: ", date);
  const wakeTimeHook = useUpdateTime("wakeTime", USER, date);
  const bedTimeHook = useUpdateTime("bedTime", USER, date);
  const updateWorkHook = useUpdateWork([], USER, date);

  return (
    <section>
      <article>
        {`Hello ${user}`}
        <CalendarTemplate
          user={"TEST"}
          updateDateHook={updateDateHook}
          wakeTimeHook={wakeTimeHook}
          bedTimeHook={bedTimeHook}
          updateWorkHook={updateWorkHook}
        />
      </article>
      <article>
        <WorkListTemplate
          wakeTimeHook={wakeTimeHook}
          bedTimeHook={bedTimeHook}
          updateWorkHook={updateWorkHook}
        />
      </article>
    </section>
  );
};
