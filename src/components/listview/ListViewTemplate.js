// import "../../css/workList/workList.css";

import { useListView } from "../../hooks/listView/useListView";
import { ListView } from "./ListView";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotLoggedInPage } from "../pages/NotLoggedInPage";
import "../../css/pages/pages.css";
const redoElement = (
  <FontAwesomeIcon className="list-icon__redo" icon={faRedo} size="2x" />
);
export const ListViewTemplate = ({ targetSetting, user, date, setDate }) => {
  const listViewHook = useListView(user, date, setDate);
  const { updateListView } = listViewHook;
  return !user ? (
    <NotLoggedInPage elementName={"Week List"} />
  ) : (
    <div className="listView">
      <h1 className="listView-header">
        <span className="listView-header__row listView-header__title">
          Check your Week Calendar
          <button
            className="listView-header__row listView-header__btn"
            onClick={updateListView}
          >
            {redoElement}
          </button>
        </span>
        <div className="listView-header__row"></div>
        <span className="listView-header__row listView-header__color-explain">
          <div className="listView-header__color-row">
            <div className="listView-header__color-box listView-header__color-box__clickedDate"></div>{" "}
            <span className="listView-header__color-text"> : Clicked Date</span>
          </div>
          <div className="listView-header__color-row">
            <div className="listView-header__color-box listView-header__color-box__today"></div>{" "}
            <span className="listView-header__color-text"> : Today</span>
          </div>
        </span>
      </h1>
      <ListView
        user={user}
        date={date}
        setDate={setDate}
        targetSetting={targetSetting}
        listViewHook={listViewHook}
      />
    </div>
  );
};
