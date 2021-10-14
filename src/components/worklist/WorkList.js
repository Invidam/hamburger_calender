import "../../css/workList/workList.css";
import "../../css/workList/tooltip.css";
import { TimeRecordDisplay } from "./element/timeBtn/TimeDisplayBtn";
import { TimeRecordBtn } from "./element/timeBtn/TimeRecordBtn";
import { EmptyWork } from "./element/work/EmptyWork";
import { Work } from "./element/work/Work";
import {
  isEmptyTimeObj,
  useRecordTime,
} from "../../hooks/workList/time/useRecordTime";
import {
  isEmptyWork,
  useWorkList,
} from "../../hooks/workList/work/useWorkList";
import { LoadingElement } from "../Loading";
export const WorkList = ({ user, date, targetSetting }) => {
  const { targetWakeTime, targetBedTime, targetWorkTime } = targetSetting;
  const [wakeTime, onClickWakeTime, setWakeTime, isWakeTimeLoading] =
    useRecordTime("wakeTime", user, date);
  const [bedTime, onClickBedTime, setBedTime, isBedTimeLoading] = useRecordTime(
    "bedTime",
    user,
    date
  );
  const [workList, setWork, isWorkListLoading] = useWorkList(user, date);
  const isLoading = () =>
    isWakeTimeLoading || isBedTimeLoading || isWorkListLoading;

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
  const wakeTimeElement = isEmptyTimeObj(wakeTime)
    ? addWakeTimeWindow
    : wakeTimeDisplay;
  const bedTimeElemnt = isEmptyTimeObj(bedTime)
    ? addBedTimeWindow
    : bedTimeDisplay;
  const workListElement =
    workList &&
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
    });
  const emptyWork =
    !workList || Object.values(workList)?.length < 5 ? (
      <EmptyWork setWork={setWork} />
    ) : (
      ""
    );

  return isLoading() ? (
    <LoadingElement text={"WorkList Loading. . ."} />
  ) : (
    <ol>
      {wakeTimeElement}
      {workListElement}
      {emptyWork}
      {bedTimeElemnt}
    </ol>
  );
  // </div>
};
