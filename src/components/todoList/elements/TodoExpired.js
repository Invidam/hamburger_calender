import StarRatings from "react-star-ratings";
import { DatePick } from "./DatePick";

import {
  faCheck,
  faEdit,
  faTrashAlt,
  faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const checkElement = (
  <FontAwesomeIcon className="todo-icon__check" icon={faCheck} size="1x" />
);
const expiredElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__expired"
    icon={faCalendarTimes}
    size="1x"
  />
);
// const editElement = (
//   <FontAwesomeIcon
//     className="todo-icon todo-icon__save"
//     icon={faEdit}
//     size="1x"
//   />
// );
const trashElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__plus"
    icon={faTrashAlt}
    size="1x"
  />
);
export const TodoExpired = ({ todoHook, id }) => {
  const [
    isEditMode,
    isCheck,
    text,
    date,
    priority,
    onClickCheck,
    ,
    ,
    ,
    ,
    ,
    onDeleteTodo,
    ,
  ] = todoHook;
  const displayBtn = (
    <div className="todo__btn-box">
      <div className="todo__btn-content">
        <button className="todo__btn todo__btn-expire todo__btn-expired">
          {expiredElement}
        </button>
        <button
          className={`todo__btn todo__btn-delete todo__btn-delete__expired todo__btn-expired `}
          onClick={onDeleteTodo}
        >
          {trashElement}
        </button>
      </div>
    </div>
  );
  const displayElement = (
    <div className="todo-expired">
      <input
        id={`todo__checkbox_${id}`}
        className="todo__checkbox todo-display__checkbox todo__content todo-display__content todo-expired__content"
        type="checkbox"
        name="todoCheck"
        value={`${isCheck}`}
        // onChange={({ target: { value } }) => onClickCheck(value)}
      ></input>
      <label
        className="todo__label todo-display__label"
        htmlFor={`todo__checkbox_${id}`}
      >
        <span className="todo__label-icon">{isCheck ? checkElement : ""}</span>
      </label>
      <span
        className={`todo__text todo-display__text todo__content todo-display__content todo-expired__content ${
          isCheck ? "todo__text-checked" : ""
        }`}
      >
        {text}
      </span>
      <DatePick date={date} isEditMode={isEditMode} isExpired={true} />
      <div className={`todo__star-rating todo-display__star}`}>
        <StarRatings
          rating={priority}
          starRatedColor="rgb(62,0,0)"
          starHoverColor="rgb(62,0,0)"
          starEmptyColor="rgba(133, 133, 133, 1)"
          starSelectingHoverColor="red"
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="2px"
        />{" "}
      </div>
      {displayBtn}
    </div>
  );
  return displayElement;
};
