import "../../css/workList.css";
import { useRecordTime } from "../../hooks/useRecoreTime";
import { useUpdateWork } from "../../hooks/useUpdateWork";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
export const WorkList = () => {
  const [wakeTime, onClickWakeTime] = useRecordTime("wakeTime");
  const addWakeTimeWindow = (
    <TimeRecordBtn onClick={onClickWakeTime} isWake={true} />
  );
  console.log("ERR BEF BEDTIME??");
  const [bedTime, onClickBedTime] = useRecordTime("bedTime");
  const addBedTimeWindow = (
    <TimeRecordBtn onClick={onClickBedTime} isWake={false} />
  );
  const wakeTimeDisplay = (
    <TimeRecordDisplay recordTime={wakeTime} isWake={true} />
  );
  const bedTimeDisplay = (
    <TimeRecordDisplay recordTime={bedTime} isWake={false} />
  );
  const [workList, setWorkList] = useUpdateWork([]);
  console.log("wrLIST: ", workList);
  const emptyWork = <EmptyWork workList={workList} setWorkList={setWorkList} />;

  return (
    <ol>
      {wakeTime ? wakeTimeDisplay : addWakeTimeWindow}
      {workList &&
        workList.map((workItem, idx) => {
          return (
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
      {bedTime ? bedTimeDisplay : addBedTimeWindow}
    </ol>
    // </div>
  );
};
