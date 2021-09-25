import "../../css/workList.css";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
export const WorkList = ({ wakeTimeHook, bedTimeHook, updateWorkHook }) => {
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
    />
  );
  const bedTimeDisplay = (
    <TimeRecordDisplay
      recordTime={bedTime}
      isWake={false}
      updateRecordTime={updateBedTime}
    />
  );

  const emptyWork = <EmptyWork workList={workList} setWorkList={setWorkList} />;

  return (
    <ol>
      {wakeTime && wakeTime.hour !== -1 ? wakeTimeDisplay : addWakeTimeWindow}
      {workList &&
        workList.map((workItem, idx) => {
          return workItem.workTime === -1 ? undefined : (
            <Work
              workItem={workItem}
              workList={workList}
              setWorkList={setWorkList}
              key={idx}
              idx={idx}
            />
          );
        })}
      {emptyWork}
      {bedTime && bedTime.hour !== -1 ? bedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
