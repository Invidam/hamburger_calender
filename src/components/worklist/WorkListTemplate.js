import "../../css/workList.css";
import { WorkList } from "./WorkList";
export const WorkListTemplate = ({ date }) => {
  return (
    <div>
      <h1>Make Hamburger</h1>
      <WorkList date={date} />
    </div>
  );
};
