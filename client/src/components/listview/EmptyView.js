export const EmptyView = ({ isLoad, viewObj, setDate, viewDate }) => {
  const viewContent = (
    <div
      className={`listView__item-box`}
      onClick={() => {
        !isLoad
          ? setDate(new Date(viewDate))
          : console.log("[deq] status: ", isLoad);
      }}
    >
      <div className="listView__item-text__box">
        <span className="listView__item-text__column listView__item-text__column-date">
          {" "}
          {viewDate.substr(5)}
        </span>
      </div>
    </div>
  );
  return viewContent;
};

// ? "empty-element workList__wakeTime-btn workList__time-btn workList__time workList__wakeTime"
//           : "empty-element workList__bedTime-btn workList__time-btn workList__time workList__bedTime"
