export const EmptyView = ({ isLoad, viewObj, setDate, viewDate }) => {
  const viewContent = (
    <div
      className={`listView__item-box`}
      onClick={() => {
        console.log("CL");
        !isLoad
          ? setDate(new Date(viewDate))
          : console.log("[deq] status: ", isLoad);
      }}
    >
      <span className="listView__item-text__box"> {viewDate.substr(5)}</span>
    </div>
  );
  return viewContent;
};

// ? "empty-element workList__wakeTime-btn workList__time-btn workList__time workList__wakeTime"
//           : "empty-element workList__bedTime-btn workList__time-btn workList__time workList__bedTime"
