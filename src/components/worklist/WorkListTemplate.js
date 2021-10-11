import "../../css/workList/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({ targetSetting, user, date }) => {
  return (
    <div>
      <h1>Make Hamburger</h1>
      <WorkList user={user} date={date} targetSetting={targetSetting} />
    </div>
  );
};
