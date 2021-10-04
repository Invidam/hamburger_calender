import "../../css/workList/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({ targetTimeObj, user, date }) => {
  return (
    <div>
      <h1>Make Hamburger</h1>
      <WorkList user={user} date={date} targetTimeObj={targetTimeObj} />
    </div>
  );
};
