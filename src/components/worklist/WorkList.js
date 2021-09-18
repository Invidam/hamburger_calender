import "../../css/workList.css";
import { useUpdateTime } from "../../hooks/workList/time/useUpdateTime";
import { useUpdateWork } from "../../hooks/workList/work/useUpdateWork";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
export const WorkList = ({
  date,
  user,
  wakeTimeHook,
  bedTimeHook,
  updateWorkHook,
}) => {
  const [wakeTime, onClickWakeTime, updateWakeTime] = wakeTimeHook;
  const [bedTime, onClickBedTime, updateBedTime] = bedTimeHook;
  const [workList, setWorkList] = updateWorkHook;
  const addWakeTimeWindow = (
    <TimeRecordBtn onClick={onClickWakeTime} isWake={true} date={date} />
  );
  const addBedTimeWindow = (
    <TimeRecordBtn onClick={onClickBedTime} isWake={false} date={date} />
  );
  const wakeTimeDisplay = (
    <TimeRecordDisplay
      recordTime={wakeTime}
      isWake={true}
      updateRecordTime={updateWakeTime}
      date={date}
    />
  );
  const bedTimeDisplay = (
    <TimeRecordDisplay
      recordTime={bedTime}
      isWake={false}
      updateRecordTime={updateBedTime}
      date={date}
    />
  );

  const emptyWork = <EmptyWork workList={workList} setWorkList={setWorkList} />;

  return (
    <ol>
      {wakeTime && wakeTime.hour !== -1 ? wakeTimeDisplay : addWakeTimeWindow}
      {workList &&
        workList.map((workItem, idx) => {
          return (
            <Work
              workItem={workItem}
              workList={workList}
              setWorkList={setWorkList}
              key={idx}
              idx={idx}
              date={date}
            />
          );
        })}
      {emptyWork}
      {bedTime && bedTime.hour !== -1 ? bedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
