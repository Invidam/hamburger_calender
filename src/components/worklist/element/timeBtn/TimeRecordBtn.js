export const TimeRecordBtn = ({ onClick, isWake, date }) => {
  return (
    <li
      className={
        isWake
          ? "empty-element workList__wakeTime-btn workList__time-btn workList__time workList__wakeTime"
          : "empty-element workList__bedTime-btn workList__time-btn workList__time workList__bedTime"
      }
      onClick={onClick}
    >
      {isWake ? "Record Wake Time" : "Record Bed Time"}
    </li>
  );
};
