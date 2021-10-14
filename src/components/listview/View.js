import { isEmptyWork } from "../../hooks/workList/work/useWorkList";
import { TimeRecordBtn } from "../worklist/element/timeBtn/TimeRecordBtn";
const wakeItem = (
  <li className="workList__wakeTime-display workList__time-display workList__time workList__wakeTime listView__item"></li>
);
const emptyWakeItem = (
  <li className="empty-element workList__wakeTime-btn workList__time-btn workList__time workList__wakeTime listView__item"></li>
);
const bedItem = (
  <li className="workList__bedTime-display workList__time-display workList__time workList__bedTime listView__item"></li>
);
const emptyBedItem = (
  <li className="empty-element workList__bedTime-btn workList__time-btn workList__time workList__bedTime listView__item"></li>
);
const workItemContent = (workItem, idx) => (
  <li
    className="workList__work listView__work-item listView__item"
    style={{ backgroundColor: workItem.workColor }}
    key={"_" + idx}
  ></li>
);
const emptyWorkItem = (
  <li
    className={
      "workList__work empty-element workList__element-empty listView__work-item listView__item"
    }
  >
    {" "}
  </li>
);
export const View = ({ viewObj, setDate, viewDate }) => {
  const workListItem = viewObj?.workList
    ? Object.values(viewObj?.workList).map((workItem, idx) => {
        return isEmptyWork(workItem) ? "" : workItemContent(workItem, idx);
      })
    : emptyWorkItem;
  const viewContent = (
    <div
      className="listView__item-box"
      onClick={() => setDate(new Date(viewDate))}
    >
      <span className="listView__item-date"> {viewDate.substr(5)}</span>
      <ol>
        {viewObj?.wakeTime ? wakeItem : emptyWakeItem} {workListItem}{" "}
        {viewObj?.bedTime ? bedItem : emptyBedItem}
      </ol>
    </div>
  );
  return viewContent;
};

// ? "empty-element workList__wakeTime-btn workList__time-btn workList__time workList__wakeTime"
//           : "empty-element workList__bedTime-btn workList__time-btn workList__time workList__bedTime"
