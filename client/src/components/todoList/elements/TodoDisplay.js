import StarRatings from "react-star-ratings";

// import es from "da"

import { DatePick } from "./DatePick";
import { faCheck, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StarRating } from "./StarRating";
const checkElement = (
  <FontAwesomeIcon className="todo-icon__check" icon={faCheck} size="1x" />
);

const editElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__save"
    icon={faEdit}
    size="1x"
  />
);
const trashElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__plus"
    icon={faTrashAlt}
    size="1x"
  />
);
export const TodoDisplay = ({ todoHook, id }) => {
  const [
    isEditMode,
    isCheck,
    text,
    date,
    priority,
    ,
    ,
    ,
    ,
    ,
    ,
    onDeleteTodo,
    onClickEditBtn,
  ] = todoHook;
  const displayBtn = (
    <div className="todo__btn-box">
      <div className="todo__btn-content">
        <button className="todo__btn todo__btn-edit" onClick={onClickEditBtn}>
          {editElement}
        </button>
        <button className="todo__btn todo__btn-delete" onClick={onDeleteTodo}>
          {trashElement}
        </button>
      </div>
    </div>
  );
  const displayElement = (
    <div className="todo">
      <input
        id={`todo__checkbox_${id}`}
        className="todo__checkbox todo-display__checkbox todo__content todo-display__content"
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
        className={`todo__text todo-display__text todo__content todo-display__content ${
          isCheck ? "todo__text-checked" : ""
        }`}
      >
        {text}
      </span>
      <DatePick date={date} isEditMode={false} />
      <StarRating priority={priority} />
      {displayBtn}
    </div>
  );
  return displayElement;
};
