import "../../css/workList.css";
export const WorkListTemplate = ({
  addWakeTimeWindow,
  addWorkWindow,
  workList,
  addBedTimeWindow,
}) => {
  return (
    <div>
      <h1>Hamburger App</h1>
      {addWorkWindow}
      {workList}
    </div>
  );
};
