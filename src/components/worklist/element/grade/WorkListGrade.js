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

  const numToStr = (num, emptyStr) => (num === -1 ? emptyStr + "h" : num + "h");
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
                  Object.values(value).map((elem) => {
                    return (
                      <td>
                        {key === "point"
                          ? makeStar(elem, false).map((star) => {
                              return (
                                <span className="workList-grade__tooltip-star">
                                  {" "}
                                  {star}
                                </span>
                              );
                            })
                          : typeof elem === "number"
                          ? numToStr(elem, " ")
                          : timeObjToStr(elem, " ")}
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

  const getGradeElement = <button onClick={updateInfo}> Get Grade~!! </button>;
  const updateGradeBtn = (
    <button
      className="workList-grade__btn workList-grade__update-btn"
      onClick={updateInfo}
    >
      {" "}
      {redoElement}{" "}
    </button>
  );
  const displayGrade = (
    <div className="workList-grade__display">
      {" "}
      <div className="tooltip">
        <GradeStarList gradeSum={gradeSum} />
        {tooltipElement}
      </div>
      {updateGradeBtn}
    </div>
  );
  return gradeInfo ? displayGrade : getGradeElement;
};
