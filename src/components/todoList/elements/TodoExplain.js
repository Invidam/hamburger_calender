import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const checkElement = (
  <FontAwesomeIcon className="todo-icon__check" icon={faCheck} size="1x" />
);
export const TodoExplain = () => {
  const [isCheck, setCheck] = useState(false);
  return (
    <div className="todo">
      <input
        id={`todo__checkbox_ex`}
        className="todo__checkbox todo__checkbox todo__content todo-display__content"
        type="checkbox"
        name="todoCheck"
        defaultValue={isCheck}
        onChange={() => setCheck(!isCheck)}
      ></input>
      <label className="todo__label" htmlFor={`todo__checkbox_ex`}>
        <span className="todo__label-icon">{isCheck ? checkElement : ""}</span>
      </label>
      <span className="todo__text todo-explain__text todo__content todo-explain__content">
        Text
      </span>
      <span className="todo__date todo-explain__date todo__content todo-explain__content">
        Deadline
      </span>
      <span className="todo__content todo-explain__priority todo-explain__content">
        Prioirty
      </span>
      {/* {displayBtn} */}
    </div>
  );
};
