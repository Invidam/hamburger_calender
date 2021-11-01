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
  console.log("INDI: ", indicateIdx, "TYPEL ", type, idx);
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
  return (
    <div className="todo">
      <div>{sortElement}</div>
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
        Deadline {iconBtn(0)}
      </span>
      <span className="todo__content todo-explain__priority todo-explain__content">
        Prioirty {iconBtn(1)}
      </span>
      {/* {displayBtn} */}
    </div>
  );
};
