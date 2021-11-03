import { useWorkListGrade } from "../../../../hooks/workList/useWorkListGrade";
import { GradeStarList } from "./GradeStarList";

export const WorkListGrade = ({ user, date }) => {
  const [grade, difference, target, value, isGradeLoading, updateInfo] =
    useWorkListGrade(user, date);
  const getGradeSum = () =>
    grade
      ? Object.values(grade).reduce((prev, value) => (prev += value), 0)
      : 0;
  const gradeSum = getGradeSum();
  console.log("SUM : ", grade, gradeSum);
  // const gradeElement = makeStar(getGradeSum()).map((elem, idx) => (
  //   <div key={idx}> {elem}</div>
  // ));
  const tooltipElement = (
    <div className="grade-tooltip-content">
      <div className="grade-tooltip-box">test</div>
    </div>
  );

  const getGradeBtn = <button onClick={updateInfo}> Get Grade! </button>;
  const displayGrade = (
    <div className="tooltip">
      {" "}
      <GradeStarList gradeSum={gradeSum} />
      {tooltipElement} | update{" "}
    </div>
  );
  return grade ? displayGrade : getGradeBtn;
};
