import "../../css/workList/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({
  targetSetting,
  user,
  date,
  workListHook,
}) => {
  return (
    <div className="workList">
      <h1>Make Hamburger</h1>
      <WorkList
        user={user}
        date={date}
        targetSetting={targetSetting}
        workListHook={workListHook}
      />
    </div>
  );
};
