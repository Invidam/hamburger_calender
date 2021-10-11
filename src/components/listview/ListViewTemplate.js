// import "../../css/workList/workList.css";

import { ListView } from "./ListView";
export const ListViewTemplate = ({ targetSetting, user, date, setDate }) => {
  return (
    <div>
      <h1>List View Template</h1>
      <ListView
        user={user}
        date={date}
        setDate={setDate}
        targetSetting={targetSetting}
      />
    </div>
  );
};
