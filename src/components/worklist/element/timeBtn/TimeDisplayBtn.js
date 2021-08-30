export const TimeRecordDisplay = ({ recordTime, isWake }) => {
  return (
    <li
      className={
        isWake
          ? "workList__wakeTime-display workList__time-display workList__time workList__wakeTime"
          : "workList__bedTime-display workList__time-display workList__time workList__bedTime"
      }
    >
      {isWake ? "Wake at " : "Sleep at "}
      {recordTime.hour < 10 ? "0" + recordTime.hour : recordTime.hour}:
      {recordTime.minute < 10 ? "0" + recordTime.minute : recordTime.minute}
    </li>
  );
};
