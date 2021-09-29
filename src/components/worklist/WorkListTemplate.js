import "../../css/workList/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({
  wakeTimeHook,
  bedTimeHook,
  updateWorkHook,
  targetTimeObj,
  user,
  date,
}) => {
  return (
    <div>
      <h1>Make Hamburger</h1>
      <WorkList
        user={user}
        date={date}
        targetTimeObj={targetTimeObj}
        wakeTimeHook={wakeTimeHook}
        bedTimeHook={bedTimeHook}
        updateWorkHook={updateWorkHook}
      />
    </div>
  );
};
