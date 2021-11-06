// import "../../css/workList/workList.css";

import { ListView } from "./ListView";
export const ListViewTemplate = ({ targetSetting, user, date, setDate }) => {
  return (
    <div className="listView">
      <h1>Check your Week Calendar</h1>
      <ListView
        user={user}
        date={date}
        setDate={setDate}
        targetSetting={targetSetting}
      />
    </div>
  );
};
