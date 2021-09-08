import "../../css/workList.css";
import { useRecordTime } from "../../hooks/useRecoreTime";
import { useUpdateWork } from "../../hooks/useUpdateWork";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
export const WorkList = () => {
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

  const [workList, setWorkList] = useUpdateWork([]);
  console.log("wrLIST: ", workList);
  const emptyWork = <EmptyWork workList={workList} setWorkList={setWorkList} />;

  return (
    <ol>
      {wakeTime ? addWakeTimeDisplay : addWakeTimeWindow}
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
