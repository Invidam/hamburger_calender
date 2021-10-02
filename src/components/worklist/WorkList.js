import "../../css/workList/workList.css";
import "../../css/workList/tooltip.css";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
import { isEmptyTimeObj } from "../../hooks/workList/time/useRecordTime";
import { isEmptyWork } from "../../hooks/workList/work/useWorkList";
import { useState } from "react";
export const WorkList = ({
  user,
  date,
  wakeTimeHook,
  bedTimeHook,
  workListHook,
  targetTimeObj,
}) => {
  const [val, setVal] = useState(0);
  const { targetWakeTime, targetBedTime, targetWorkTime } = targetTimeObj;
  const [wakeTime, onClickWakeTime, setWakeTime] = wakeTimeHook;
  const [bedTime, onClickBedTime, setBedTime] = bedTimeHook;
  const [workList, setWork] = workListHook;
  const addWakeTimeWindow = (
    <TimeRecordBtn onClick={onClickWakeTime} isWake={true} />
  );
  const addBedTimeWindow = (
    <TimeRecordBtn onClick={onClickBedTime} isWake={false} />
  );
  const wakeTimeDisplay = (
    <TimeRecordDisplay
      recordTime={wakeTime}
      isWake={true}
      setTime={setWakeTime}
      targetTime={targetWakeTime}
    />
  );
  const bedTimeDisplay = (
    <TimeRecordDisplay
      recordTime={bedTime}
      isWake={false}
      setTime={setBedTime}
      targetTime={targetBedTime}
    />
  );
  console.log("[WORKLIST]", workList);
  const emptyWork = <EmptyWork setWork={setWork} />;

  return (
    <ol>
      {isEmptyTimeObj(wakeTime) ? addWakeTimeWindow : wakeTimeDisplay}
      {workList &&
        Object.values(workList).map((workItem, idx) => {
          return isEmptyWork(workItem) ? undefined : (
            <Work
              user={user}
              date={date}
              workItem={workItem}
              setWork={setWork}
              key={idx}
              id={workItem.id}
              targetTime={targetWorkTime}
            />
          );
        })}
      {emptyWork}
      {isEmptyTimeObj(bedTime) ? addBedTimeWindow : bedTimeDisplay}
    </ol>
    // </div>
  );
};
