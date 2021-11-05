import * as iconSolid from "@fortawesome/free-solid-svg-icons";
import * as iconRegular from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const starElement = (
  <FontAwesomeIcon
    className="work-icon__star"
    icon={iconSolid.faStar}
    size="1x"
  />
);
const starHalfAltElement = (
  <div className="work-icon__star-half__box">
    <FontAwesomeIcon
      className="work-icon__star-half__full"
      icon={iconSolid.faStar}
      size="1x"
    />
    <FontAwesomeIcon
      className="work-icon__star-half__half"
      icon={iconSolid.faStarHalf}
      size="1x"
    />
  </div>
);
const starHalfElement = (
  <FontAwesomeIcon
    className="work-icon__star-half"
    icon={iconSolid.faStarHalf}
    size="1x"
  />
);
const starEmptyElement = (
  <FontAwesomeIcon
    className="work-icon__star-empty"
    icon={iconSolid.faStar}
    size="1x"
  />
);

export const makeStar = (gradeSum, isAlt = true) =>
  new Array(5).fill().map((elem, idx) => {
    return 2 * (idx + 1) <= gradeSum
      ? starElement
      : 2 * (idx + 1) - gradeSum === 1
      ? isAlt
        ? starHalfAltElement
        : starHalfElement
      : isAlt
      ? starEmptyElement
      : "";
  });

export const GradeStarList = ({ gradeSum }) => {
  console.log("SYM : ", gradeSum);
  const starArr = makeStar(gradeSum);
  return (
    <ol className="workList-star__list">
      {starArr.map((elem, idx) => {
        return (
          <li className="workList-star__item" key={idx}>
            {elem}
          </li>
        );
      })}
    </ol>
  );
};
