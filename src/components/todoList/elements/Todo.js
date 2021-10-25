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
import { TodoInput } from "./TodoInput";
import { TodoDisplay } from "./TodoDisplay";
const checkElement = (
  <FontAwesomeIcon className="todo-icon__check" icon={faCheck} size="1x" />
);
export const Todo = ({ setTodo, _isEditMode, todoItem, id }) => {
  const todoHook = useTodo(setTodo, todoItem, _isEditMode, id);
  // console.log("ID: ", id, "EDIT? ", todoHook.isEditMode, _isEditMode);
  const isEditMode = todoHook[0];
  // const inputBtn = (
  //   <div className="todo__btn-box todo__btn-box">
  //     <button
  //       className="todo__btn todo__btn-add"
  //       onClick={isSubmitMode ? onSubmitTodo : onEditTodo}
  //     >
  //       {isSubmitMode ? "+" : "Save"}
  //     </button>
  //   </div>
  // );
  // const displayBtn = (
  //   <div className="todo__btn-box todo__btn-box">
  //     <button className="todo__btn todo__btn-edit" onClick={onClickEditBtn}>
  //       E
  //     </button>
  //     <button className="todo__btn todo__btn-delete" onClick={onDeleteTodo}>
  //       X
  //     </button>
  //   </div>
  // );
  // const inputElement = (
  //   <div className="todo">
  //     <input
  //       id={`todo__checkbox_${id}`}
  //       className="todo__checkbox todo__checkbox todo__content todo-input__content"
  //       type="checkbox"
  //       name="todoCheck"
  //       defaultValue={todoItem?.isCheck}
  //       onChange={({ target: { value } }) => onClickCheck(value)}
  //     ></input>
  //     <label className="todo__label" htmlFor={`todo__checkbox_${id}`}>
  //       <span className="todo__label-icon">{isCheck ? checkElement : ""}</span>
  //     </label>
  //     {/* <input type="checkbox" name="TEST"></input> */}
  //     <input
  //       className="todo__text todo-input__text todo__content todo-input__content"
  //       type="text"
  //       autoComplete="off"
  //       name="todoText"
  //       defaultValue={todoItem?.text}
  //       onChange={({ target: { value } }) => onChangeText(value)}
  //     ></input>
  //     {/* <input
  //       className="todo-input__date todo-input__content"
  //       type="date"
  //       name="todoDate"
  //       lang="en-us"
  //       required
  //       pattern="\d{4}-\d{2}-\d{2}"
  //       defaultValue={isEditMode ? todoItem?.date : undefined}
  //       min={getToday()}
  //       onChange={({ target: { value } }) => onChangeDate(value)}
  //     ></input> */}
  //     <DatePick
  //       isEditMode={isEditMode}
  //       date={date}
  //       onChangeDate={onChangeDate}
  //     />
  //     {/* <input
  //       className="todo-input__priority todo-input__content"
  //       type="text"
  //       name="todoPriority"
  //       defaultValue={todoItem?.priority}
  //       onChange={({ target: { value } }) => onChangePriority(value)}
  //     ></input> */}
  //     <div className={`todo__star-rating todo-input__star `}>
  //       <StarRatings
  //         // rating={todoItem?.priority}
  //         starRatedColor="rgba(241, 196, 15,0.8)"
  //         starEmptyColor="rgba(151, 151, 151, 0.707)"
  //         starHoverColor="rgba(241, 196, 15,0.9)"
  //         starSelectingHoverColor="red"
  //         changeRating={onChangePriority}
  //         numberOfStars={5}
  //         name="rating"
  //         starDimension="12px"
  //         starSpacing="0px"
  //       />{" "}
  //     </div>
  //     {inputBtn}
  //   </div>
  // );

  // const displayElement = (
  //   <div className="todo">
  //     <input
  //       id={`todo__checkbox_${id}`}
  //       className="todo__checkbox todo__checkbox todo__content todo-display__content"
  //       type="checkbox"
  //       name="todoCheck"
  //       defaultValue={todoItem?.isCheck}
  //       onChange={({ target: { value } }) => onClickCheck(value)}
  //     ></input>
  //     <label className="todo__label" htmlFor={`todo__checkbox_${id}`}>
  //       <span className="todo__label-icon">{isCheck ? checkElement : ""}</span>
  //     </label>
  //     <span className="todo__text todo-display__text todo__content todo-display__content">
  //       {todoItem?.text}
  //     </span>
  //     <DatePick date={date} isEditMode={isEditMode} />
  //     <div className={`todo__star-rating todo-display__star}`}>
  //       <StarRatings
  //         starRatedColor="rgba(241, 196, 15,1.0)"
  //         starEmptyColor="rgba(151, 151, 151, 0.707)"
  //         starHoverColor="rgba(241, 196, 15,0.9)"
  //         starSelectingHoverColor="red"
  //         numberOfStars={5}
  //         name="rating"
  //         starDimension="12px"
  //         starSpacing="0px"
  //       />{" "}
  //     </div>
  //     {displayBtn}
  //   </div>
  // );
  return (
    <li className="todo" key={"_" + todoItem?.id}>
      {isEditMode ? (
        <TodoInput todoHook={todoHook} todoItem={todoItem} key={id} id={id} />
      ) : (
        <TodoDisplay todoHook={todoHook} todoItem={todoItem} key={id} id={id} />
      )}
    </li>
  );
};
