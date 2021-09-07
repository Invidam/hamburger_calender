export const Work = ({ workItem, idx }) => {
  return (
    <li
      className="workList__work tooltip"
      style={{ backgroundColor: workItem.workColor }}
      key={idx}
    >
      {workItem.workName} {workItem.workTime}h
      <span className="tooltip-content" key={idx}>
        {workItem.workName} {workItem.workTime}h
      </span>
    </li>
  );
};
