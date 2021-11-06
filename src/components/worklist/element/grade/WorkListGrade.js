import { useWorkListGrade } from "../../../../hooks/workList/useWorkListGrade";
import { GradeStarList, makeStar } from "./GradeStarList";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { timeObjToStr } from "../../../../tools/time";
const keyOrderArr = ["target", "value", "difference", "point"];
const redoElement = (
  <FontAwesomeIcon className="work-icon__redo" icon={faRedo} size="1x" />
);

const strToFirstLEtterUpper = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);
export const WorkListGrade = ({ user, date }) => {
  // const [grade, difference, target, value, isGradeLoading, updateInfo] =
  const [gradeInfo, isGradeLoading, updateInfo] = useWorkListGrade(user, date);
  const getGradeSum = () =>
    gradeInfo
      ? Object.values(gradeInfo?.point).reduce(
          (prev, value) => (prev += value),
          0
        )
      : 0;
  const gradeSum = getGradeSum();
  // console.log("SUM : ", grade, gradeSum);
  // const gradeElement = makeStar(getGradeSum()).map((elem, idx) => (
  //   <div key={idx}> {elem}</div>
  // ));
  // Object.entries(gradeInfo).map(([key, value]) => {
  //   return (
  //     <tr>
  //       <td>{strToFirstLEtterUpper(key)}</td>
  //       {value.map((elem) => {
  //         return <td> {elem}</td>;
  //       })}
  //     </tr>
  //   );
  // });

  const numToStr = (num, emptyStr) => (num === -1 ? emptyStr : num + "h");
  const getValue = (type, elem) => {
    const getValueInPoint = () =>
      makeStar(elem, false).map((star, idx) => {
        return (
          <span key={"star" + idx} className="workList-grade__tooltip-star">
            {star}
          </span>
        );
      });
    if (type === "point") return getValueInPoint();
    else if (type === "target" || type === "value")
      return timeObjToStr(elem, "X");
    else {
      // diff
      numToStr(elem, "X");
    }
  };
  const tableElement = (
    <table border={1}>
      <thead>
        <tr>
          <th></th>
          <th className="workList-grade__tooltip__row">WakeTime</th>
          <th className="workList-grade__tooltip__row">BedTime</th>
          <th className="workList-grade__tooltip__row">WorkTimeSum</th>
        </tr>
      </thead>
      <tbody>
        {gradeInfo &&
          keyOrderArr.map((key) => {
            const value = gradeInfo[key];
            return (
              <tr key={key}>
                <td>{strToFirstLEtterUpper(key)}</td>
                {console.log(value)}
                {value &&
                  Object.values(value).map((elem, idx) => {
                    return (
                      <td key={key + idx}>
                        {key === "point"
                          ? getValue(key, elem)
                          : typeof elem === "number"
                          ? numToStr(elem, "X")
                          : timeObjToStr(elem, "X")}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
  const tooltipElement = (
    <div className="grade-tooltip-content">
      <div className="grade-tooltip-box">{tableElement} </div>
    </div>
  );

  const getGradeElement = (
    <button
      className="workList-grade__btn workList-grade__btn-init"
      onClick={updateInfo}
    >
      Get Grade ⭐
    </button>
  );
  const updateGradeBtn = (
    <button
      className="workList-grade__btn workList-grade__btn-update"
      onClick={updateInfo}
    >
      {redoElement}
    </button>
  );
  const displayGrade = (
    <div className="workList-grade__display">
      <div className="tooltip workList-grade__point">
        <GradeStarList gradeSum={gradeSum} />
        {tooltipElement}
      </div>
      {updateGradeBtn}
    </div>
  );
  return gradeInfo ? displayGrade : getGradeElement;
};
