// import "../../css/workList/workList.css";

import { useListView } from "../../hooks/listView/useListView";
import { ListView } from "./ListView";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const redoElement = (
  <FontAwesomeIcon className="list-icon__redo" icon={faRedo} size="1x" />
);
export const ListViewTemplate = ({ targetSetting, user, date, setDate }) => {
  const listViewHook = useListView(user, date, setDate);
  const { updateListView } = listViewHook;
  return (
    <div className="listView">
      <h1 className="listView-header">
        <span className="listView-header__row listView-header__title">
          Check your Week Calendar
        </span>
        <button
          className="listView-header__row listView-header__btn"
          onClick={updateListView}
        >
          {redoElement}
        </button>
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
