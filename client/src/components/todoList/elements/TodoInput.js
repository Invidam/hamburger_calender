import StarRatings from "react-star-ratings";
import { DatePick } from "./DatePick";

import {
  faCheck,
  faSave,
  faPlus,
  faTrashAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StarRating } from "./StarRating";
const checkElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__check"
    icon={faCheck}
    size="1x"
  />
);
const saveElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__save"
    icon={faSave}
    size="1x"
  />
);
const plusElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__plus"
    icon={faPlus}
    size="1x"
  />
);
const trashElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__trash"
    icon={faTrashAlt}
    size="1x"
  />
);
const clearElement = (
  <FontAwesomeIcon
    className="todo-icon todo-icon__times"
    icon={faTimes}
    size="1x"
  />
);
export const TodoInput = ({ todoHook, id }) => {
  const isSubmitMode = id === -1;
  const [
    isEditMode,
    isCheck,
    text,
    date,
    priority,
    onClickCheck,
    onChangeText,
    onChangeDate,
    onChangePriority,
    onSubmitTodo,
    onEditTodo,
    onDeleteTodo,
    ,
    onClearTodo,
  ] = todoHook;
  const submitContent = (
    <button className="todo__btn todo__btn-add" onClick={onSubmitTodo}>
      {plusElement}
    </button>
  );
  const editContent = (
    <button className="todo__btn todo__btn-edit" onClick={onEditTodo}>
      {saveElement}
    </button>
  );
  const clearContent = (
    <button className="todo__btn todo__btn-clear" onClick={onClearTodo}>
      {clearElement}
    </button>
  );
  const deleteContent = (
    <button className="todo__btn todo__btn-delete" onClick={onDeleteTodo}>
      {trashElement}
    </button>
  );
  const inputBtn = (
    <div className="todo__btn-box">
      <div className="todo__btn-content">
        {isSubmitMode ? submitContent : editContent}
        {isSubmitMode ? clearContent : deleteContent}
      </div>
    </div>
  );
  const inputElement = (
    <div className={`${isSubmitMode ? "todo todo-add" : "todo"}`}>
      <input
        id={`todo__checkbox_${id}`}
        className={`todo__checkbox todo__checkbox todo__content ${
          isSubmitMode ? "todo-add__content" : "todo-input__content"
        }`}
        type="checkbox"
        name="todoCheck"
        value={isCheck || false}
        onChange={({ target: { value } }) => onClickCheck(value)}
      ></input>
      <label
        className={`todo__label ${isSubmitMode ? "todo__label-disable" : ""}`}
        htmlFor={`todo__checkbox_${id}`}
      >
        <span className="todo__label-icon">
          {isSubmitMode ? "" : isCheck ? checkElement : ""}
        </span>
      </label>
      <input
        className={`todo__text todo-input__text todo__content ${
          isSubmitMode ? "todo-add__content" : "todo-input__content"
        } ${isCheck ? "todo__text-checked" : ""}`}
        type="text"
        autoComplete="off"
        name="todoText"
        value={text || ""}
        onChange={({ target: { value } }) => onChangeText(value)}
      ></input>
      <DatePick
        isEditMode={isEditMode}
        isSubmitMode={isSubmitMode}
        date={date}
        onChangeDate={onChangeDate}
      />
      <StarRating priority={priority} onChangePriority={onChangePriority} />
      {inputBtn}
    </div>
  );
  return inputElement;
};
