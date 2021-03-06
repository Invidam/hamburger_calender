import {
  faCheck,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { SORT_TYPES, SORT_TYPE_CNT } from "../TodoList";
const checkElement = (
  <FontAwesomeIcon className="todo-icon__check" icon={faCheck} size="1x" />
);
const sortElement = (
  <FontAwesomeIcon
    className="todo-icon__sort todo-icon__sort-all"
    icon={faSort}
    size="1x"
  />
);
const sortUpElement = (
  <FontAwesomeIcon
    className="todo-icon__sort todo-icon__sort-top"
    icon={faSortUp}
    size="1x"
  />
);
const sortDownElement = (
  <FontAwesomeIcon
    className="todo-icon__sort todo-icon__sort-bottom"
    icon={faSortDown}
    size="1x"
  />
);
const getIconArrByIdx = (idx) => {
  const indicateIdx = Math.floor(idx / SORT_TYPE_CNT);
  const type = idx % SORT_TYPES;
  return new Array(SORT_TYPE_CNT)
    .fill()
    .map((elem, idx) =>
      idx !== indicateIdx
        ? sortElement
        : type === 1
        ? sortUpElement
        : sortDownElement
    );
};
export const TodoExplain = ({ onClickByTabIdx, sortTypeIdx }) => {
  const [isCheck, setCheck] = useState(false);
  const iconArr = getIconArrByIdx(sortTypeIdx);
  const iconBtn = (colIdx) => {
    const icon = iconArr[colIdx];
    return (
      <button
        className="todo__explain-btn"
        onClick={() => onClickByTabIdx(colIdx)}
      >
        {" "}
        {icon}
      </button>
    );
  };
  const inputBtn = (
    <div className="todo__btn-box">
      <div className="todo__btn-content"></div>
    </div>
  );
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
      <div className="todo__text todo-explain__text todo__content todo-explain__content">
        <span className="todo-explain__text-box">Text</span>
      </div>
      <div className="todo__date todo-explain__date todo__content todo-explain__content">
        <span className="todo-explain__text-box">Deadline {iconBtn(0)}</span>
      </div>
      <div className="todo__content todo-explain__priority todo-explain__content">
        <span className="todo-explain__text-box">Prioirty {iconBtn(1)}</span>
      </div>
      {inputBtn}
    </div>
  );
};
