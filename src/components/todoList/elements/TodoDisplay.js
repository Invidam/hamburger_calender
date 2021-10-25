import StarRatings from "react-star-ratings";
import DatePicker from "react-datepicker";

import { registerLocale, setDefaultLocale } from "react-datepicker";
// import es from "da"
import { useTodo } from "../../../hooks/todolist/useTodo";
import { getToday } from "../../../tools/time";
import { DatePick } from "./DatePick";
import { useState } from "react";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const checkElement = (
  <FontAwesomeIcon className="todo-icon__check" icon={faCheck} size="1x" />
);
export const TodoDisplay = ({ todoHook, todoItem, id }) => {
  const [
    isEditMode,
    isCheck,
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
    ,
    onClickEditBtn,
  ] = todoHook;
  const displayBtn = (
    <div className="todo__btn-box todo__btn-box">
      <button className="todo__btn todo__btn-edit" onClick={onClickEditBtn}>
        E
      </button>
      <button className="todo__btn todo__btn-delete" onClick={onDeleteTodo}>
        X
      </button>
    </div>
  );
  console.log("CHECK CHECK: ", todoItem, todoItem.isCheck, isCheck);
  const displayElement = (
    <div className="todo">
      <input
        id={`todo__checkbox_${id}`}
        className="todo__checkbox todo__checkbox todo__content todo-display__content"
        type="checkbox"
        name="todoCheck"
        value={`${isCheck}`}
        onChange={({ target: { value } }) => onClickCheck(value)}
      ></input>
      <label className="todo__label" htmlFor={`todo__checkbox_${id}`}>
        <span className="todo__label-icon">{isCheck ? checkElement : ""}</span>
      </label>
      <span className="todo__text todo-display__text todo__content todo-display__content">
        {todoItem?.text}
      </span>
      <DatePick date={date} isEditMode={isEditMode} />
      <div className={`todo__star-rating todo-display__star}`}>
        <StarRatings
          rating={priority}
          starRatedColor="rgb(224, 200, 47)"
          starHoverColor="rgb(224, 200, 47)"
          starEmptyColor="rgba(133, 133, 133, 1)"
          starSelectingHoverColor="red"
          numberOfStars={5}
          name="rating"
          starDimension="12px"
          starSpacing="0px"
        />{" "}
      </div>
      {displayBtn}
    </div>
  );
  return displayElement;
};
