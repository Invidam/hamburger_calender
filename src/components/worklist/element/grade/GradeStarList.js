import * as iconSolid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const starElement = (classType) => (
  <FontAwesomeIcon
    className={`${classType}__star`}
    icon={iconSolid.faStar}
    size="1x"
  />
);
const starHalfAltElement = (classType) => (
  <div className={`${classType}__star-half__box`}>
    <FontAwesomeIcon
      className={`${classType}__star-half__full`}
      icon={iconSolid.faStar}
      size="1x"
    />
    <FontAwesomeIcon
      className={`${classType}__star-half__half`}
      icon={iconSolid.faStarHalf}
      size="1x"
    />
  </div>
);
const starHalfElement = (classType) => (
  <FontAwesomeIcon
    className={`${classType}__star-half`}
    icon={iconSolid.faStarHalf}
    size="1x"
  />
);
const starEmptyElement = (classType) => (
  <FontAwesomeIcon
    className={`${classType}__star-empty`}
    icon={iconSolid.faStar}
    size="1x"
  />
);

export const makeStar = (gradeSum, isAlt = true, classType) =>
  new Array(5).fill().map((elem, idx) => {
    return 2 * (idx + 1) <= gradeSum
      ? starElement(classType)
      : 2 * (idx + 1) - gradeSum === 1
      ? isAlt
        ? starHalfAltElement(classType)
        : starHalfElement(classType)
      : isAlt
      ? starEmptyElement(classType)
      : "";
  });

export const GradeStarList = ({ gradeSum }) => {
  const starArr = makeStar(gradeSum, true, "work-icon");
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
