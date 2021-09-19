import "../../css/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({
  wakeTimeHook,
  bedTimeHook,
  updateWorkHook,
}) => {
  return (
    <div>
      <h1>Make Hamburger</h1>
      <WorkList
        wakeTimeHook={wakeTimeHook}
        bedTimeHook={bedTimeHook}
        updateWorkHook={updateWorkHook}
      />
    </div>
  );
};
