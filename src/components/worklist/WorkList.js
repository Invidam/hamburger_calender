import "../../css/workList.css";
import { useRecordTime } from "../../hooks/useRecoreTime";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
export const WorkList = ({ workList, addWorkWindow, modal, openModal }) => {
  const [wakeTime, onClickWakeTime] = useRecordTime("wakeTime");
  const [bedTime, onClickBedTime] = useRecordTime("bedTime");
  const addWakeTimeWindow = (
    <TimeRecordBtn onClick={onClickWakeTime} isWake={true} />
  );
  const addBedTimeWindow = (
    <TimeRecordBtn onClick={onClickBedTime} isWake={false} />
  );
  const addWakeTimeDisplay = (
    <TimeRecordDisplay recordTime={wakeTime} isWake={true} />
  );
  const addBedTimeDisplay = (
    <TimeRecordDisplay recordTime={bedTime} isWake={false} />
  );
  // const makeWorkItem = (workItem, idx) => {
  // };
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
        workList.map((workItem, idx) => {
          return <Work workItem={workItem} idx={idx} key={idx} />;
        })}
      <li className="tooltip">
        <div className="tooltip-content">Study Hard 3h</div>
        test
      </li>
      {emptyWork}
      {bedTime ? addBedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
