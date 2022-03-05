import "../../css/workList/workList.css";
import { WorkList } from "./WorkList";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const WorkListTemplate = ({ targetSetting, user, date }) => {
  return (
    <div className="workList article-template">
      <header className="workList-header article-header">
        <h1>Make Hamburger</h1>
      </header>
      <WorkList user={user} date={date} targetSetting={targetSetting} />
    </div>
  );
};
