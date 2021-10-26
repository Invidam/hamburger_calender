import StarRatings from "react-star-ratings";
import DatePicker from "react-datepicker";

import { useTodo } from "../../../hooks/todolist/useTodo";
import { DatePick } from "./DatePick";

import { faCheck, faSave, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
export const TodoInput = ({ todoHook, todoItem, id }) => {
  const isSubmitMode = id === 0;
  const [
    isEditMode,
    isCheck,
    date,
    priority,
    onClickCheck,
    onChangeText,
    onChangeDate,
    onChangePriority,
    onSubmitTodo,
    onEditTodo,
  ] = todoHook;
  const inputBtn = (
    <div className="todo__btn-box">
      <button
        className="todo__btn-content todo__btn todo__btn-add"
        onClick={isSubmitMode ? onSubmitTodo : onEditTodo}
      >
        {isSubmitMode ? plusElement : saveElement}
      </button>
    </div>
  );
  console.log("PRI: ", priority);
  const inputElement = (
    <div className={`todo ${isSubmitMode ? "todo-add" : ""}`}>
      <input
        id={`todo__checkbox_${id}`}
        className={`todo__checkbox todo__checkbox todo__content ${
          isSubmitMode ? "todo-add__content" : "todo-input__content"
        }`}
        type="checkbox"
        name="todoCheck"
        defaultValue={isCheck}
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
      {/* <input type="checkbox" name="TEST"></input> */}
      <input
        className={`todo__text todo-input__text todo__content ${
          isSubmitMode ? "todo-add__content" : "todo-input__content"
        } ${isCheck ? "todo__text-checked" : ""}`}
        type="text"
        autoComplete="off"
        name="todoText"
        defaultValue={todoItem?.text}
        onChange={({ target: { value } }) => onChangeText(value)}
      ></input>
      {/* <input
        className={`todo-input__date ${isSubmitMode ? "todo-add__content" : "todo-input__content"}`}
        type="date"
        name="todoDate"
        lang="en-us"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        defaultValue={isEditMode ? todoItem?.date : undefined}
        min={getToday()}
        onChange={({ target: { value } }) => onChangeDate(value)}
      ></input> */}
      <DatePick
        isEditMode={isEditMode}
        isSubmitMode={isSubmitMode}
        date={date}
        onChangeDate={onChangeDate}
      />
      {/* <input
        className={`todo-input__priority ${isSubmitMode ? "todo-add__content" : "todo-input__content"}`}
        type="text"
        name="todoPriority"
        defaultValue={todoItem?.priority}
        onChange={({ target: { value } }) => onChangePriority(value)}
      ></input> */}
      <div className={`todo__star-rating todo-input__star`}>
        <StarRatings
          rating={priority}
          starRatedColor="rgb(255, 223, 0)"
          starHoverColor="rgb(255, 223, 0)"
          starEmptyColor="rgba(162, 162, 162, 1)"
          starSelectingHoverColor="red"
          changeRating={onChangePriority}
          numberOfStars={5}
          name="rating"
          starDimension="24px"
          starSpacing="2px"
        />{" "}
      </div>
      {inputBtn}
    </div>
  );
  return inputElement;
};
