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
const starHalfElement = (
  <FontAwesomeIcon
    className="work-icon__star-half"
    icon={iconSolid.faStarHalfAlt}
    size="1x"
  />
);
const starEmptyElement = (
  <FontAwesomeIcon
    className="work-icon__star"
    icon={iconRegular.faStar}
    size="1x"
  />
);

const makeStar = (gradeSum) =>
  new Array(5).fill().map((elem, idx) => {
    return 2 * (idx + 1) <= gradeSum
      ? starElement
      : 2 * (idx + 1) - gradeSum === 1
      ? starHalfElement
      : starEmptyElement;
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
