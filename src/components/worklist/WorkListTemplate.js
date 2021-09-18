import "../../css/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({
  date,
  user,
  wakeTimeHook,
  bedTimeHook,
  updateWorkHook,
}) => {
  return (
    <div>
      <h1>Make Hamburger</h1>
      <WorkList
        date={date}
        user={user}
        wakeTimeHook={wakeTimeHook}
        bedTimeHook={bedTimeHook}
        updateWorkHook={updateWorkHook}
      />
    </div>
  );
};
