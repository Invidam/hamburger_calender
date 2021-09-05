import { useRecordTime } from "../../hooks/useRecoreTime";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { IngredientEx, tomato } from "./window/IngredientList";
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
  const makeWorkItem = (workItem, idx) => {
    return (
      <li
        className="workList__work"
        style={{ backgroundColor: workItem.workColor }}
        key={idx}
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
        workList.map((workItem, idx) => {
          return makeWorkItem(workItem, idx);
        })}
      {emptyWork}
      <IngredientEx ingredienName={"tomato"} />
      <IngredientEx ingredienName={"cheeze"} />
      <IngredientEx ingredienName={"meet"} />
      <IngredientEx ingredienName={"vegetable"} />
      {bedTime ? addBedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
