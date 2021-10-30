import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import "../../../css/todoList.css";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DatePick = ({ date, onChangeDate, isSubmitMode, isEditMode }) => {
  return isEditMode ? (
    <DatePicker
      className={`todo__content todo__date ${
        isSubmitMode ? "todo-add__content" : "todo-input__content"
      }`}
      selected={date ? new Date(date) : undefined}
      onChange={(value) => onChangeDate(value)}
      minDate={new Date()}
      dateFormat="yy/MM/dd"
      // placeholderText="Deadline"
      customInput={undefined}
      popperClassName="todo__date-popper"
      popperPlacement="bottom-start"

      // disabledKeyboardNavigation={true}
    />
  ) : (
    <DatePicker
      className={`todo__content todo__date todo-display__content`}
      selected={date ? new Date(date) : undefined}
      onChange={(value) => onChangeDate(value)}
      minDate={new Date()}
      dateFormat="yy/MM/dd"
      // placeholderText="Deadline"
      customInput={undefined}
      readOnly
      popperClassName="todo__date-popper"
      popperPlacement="bottom-start"
      // disabledKeyboardNavigation={true}
    />
  );
};
//readOnly
