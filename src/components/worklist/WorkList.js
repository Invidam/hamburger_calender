import { useRecordTime } from "../../hooks/useRecoreTime";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";

export const WorkList = ({ workList, addWorkWindow, modal, openModal }) => {
  const [wakeTime, onClickWakeTime] = useRecordTime("wakeTime");
  const addWakeTimeWindow = (
    <TimeRecordBtn onClick={onClickWakeTime} isWake={true} />
  );
  const [bedTime, onClickBedTime] = useRecordTime("bedTime");
  const addBedTimeWindow = (
    <TimeRecordBtn onClick={onClickBedTime} isWake={false} />
  );
  const addWakeTimeDisplay = (
    <TimeRecordDisplay recordTime={wakeTime} isWake={true} />
  );
  const addBedTimeDisplay = (
    <TimeRecordDisplay recordTime={bedTime} isWake={false} />
  );
  const makeWorkItem = (workItem) => {
    return (
      <li
        className="workList__work"
        style={{ backgroundColor: workItem.workColor }}
      >
        {workItem.workName} {workItem.workTime}h
      </li>
    );
  };
  const emptyWork = (
    <EmptyWork
      addWorkWindow={addWorkWindow}
      modal={modal}
      openModal={openModal}
    />
  );
  return (
    <ol>
      {wakeTime ? addWakeTimeDisplay : addWakeTimeWindow}
      {workList &&
        workList.map((workItem) => {
          return makeWorkItem(workItem);
        })}
      {emptyWork}
      {bedTime ? addBedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
