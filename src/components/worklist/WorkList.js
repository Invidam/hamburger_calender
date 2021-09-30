import "../../css/workList/workList.css";
import "../../css/workList/tooltip.css";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
export const WorkList = ({
  user,
  date,
  wakeTimeHook,
  bedTimeHook,
  updateWorkHook,
  targetTimeObj,
}) => {
  const { targetWakeTime, targetBedTime, targetWorkTime } = targetTimeObj;
  const [wakeTime, onClickWakeTime, updateWakeTime] = wakeTimeHook;
  const [bedTime, onClickBedTime, updateBedTime] = bedTimeHook;
  const [workList, setWorkList] = updateWorkHook;
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
      updateRecordTime={updateWakeTime}
      targetTime={targetWakeTime}
    />
  );
  const bedTimeDisplay = (
    <TimeRecordDisplay
      recordTime={bedTime}
      isWake={false}
      updateRecordTime={updateBedTime}
      targetTime={targetBedTime}
    />
  );
  console.log("WORKLIST, WORLKIST: ", workList);
  const emptyWork = (
    <EmptyWork
      user={user}
      date={date}
      workList={workList}
      setWorkList={setWorkList}
    />
  );

  return (
    <ol>
      {workList?.length && workList[0].workTime !== -1 ? workList.length : 0}
      {wakeTime && wakeTime.hour !== -1 ? wakeTimeDisplay : addWakeTimeWindow}
      {workList &&
        Object.values(workList).map((workItem) => {
          return workItem.workTime === -1 ? undefined : (
            <Work
              user={user}
              date={date}
              workItem={workItem}
              workList={workList}
              setWorkList={setWorkList}
              key={workItem.id}
              id={workItem.id}
              targetTime={targetWorkTime}
            />
          );
        })}
      {emptyWork}
      {bedTime && bedTime.hour !== -1 ? bedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
