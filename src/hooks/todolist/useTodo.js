import { useState } from "react";
import randomToken from "rand-token";
import { changeFormatYYYYMMDD } from "../../tools/time";
export const useTodo = (setTodo, todoItem, _isEditMode, id) => {
  const [isEditMode, setEditMode] = useState(_isEditMode);
  const [isCheck, setCheck] = useState(todoItem?.isCheck);
  const [text, setText] = useState(todoItem?.text);
  const [date, setDate] = useState(todoItem?.date ? todoItem?.date : undefined);
  const [priority, setPriority] = useState(todoItem?.priority);
  const [isStopPriority, setStopPriortiy] = useState(false);
  const changeEditMode = () => setEditMode(id === 0 ? true : !isEditMode);
  const onClickCheck = () => setCheck(!isCheck);
  const onChangeText = (text) => setText(text);
  const onChangeDate = (date) => setDate(changeFormatYYYYMMDD(date, false));
  const onChangePriority = (rating) => {
    console.log("RAT: ", rating);
    setPriority(rating);
  };
  //   const onCheck = (event) => {
  //     try {
  //       event.preventDefault();
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  const onChangeStopPriority = () => setStopPriortiy(!isStopPriority);
  const validator = (todoItem) => {
    return todoItem.text && todoItem.date && todoItem.priority;
  };
  const getErrText = () => {
    let errText = `[ERROR] In, TodoList ${text ? "" : " Text"}${
      !date + !priority > 0 && !text ? ", " : ""
    }${date ? "" : " Date"}${!priority > 0 && !date ? ", " : ""}${
      priority ? "" : " Prioirty"
    } ${!text + !date + !priority > 1 ? "are" : "is"} not entered.`;
    return errText;
  };
  const onSubmitTodo = (event) => {
    try {
      // console.log("EDIT EDIT EDIT");
      event.preventDefault();
      const id = Date.now().toString(16) + randomToken.generate(5);
      const todoItem = { isCheck, text, date, priority, id };
      let willUpdate = true;
      if (typeof validator === "function") willUpdate = validator(todoItem);
      if (willUpdate) {
        setTodo(todoItem).create();
      } else {
        throw new Error(getErrText());
      }
    } catch (error) {
      alert(error);
    }
  };
  const onClickEditBtn = () => {
    changeEditMode();
  };
  const onEditTodo = (event) => {
    try {
      event.preventDefault();
      let willUpdate = true;
      const id = todoItem?.id;
      const _todoItem = { isCheck, text, date, priority, id };
      if (typeof validator === "function") willUpdate = validator(_todoItem);
      if (willUpdate) {
        changeEditMode();
        setTodo(_todoItem).edit();
      } else {
        throw new Error(getErrText());
      }
    } catch (error) {
      alert(error);
    }
  };
  const onDeleteTodo = (event) => {
    try {
      event.preventDefault();
      const deleteAction = () => setTodo(todoItem).delete();
      const cancelAction = () => console.log("CANCEL DELETE WORK");
      if (window.confirm("Are you sure you want to delete this item?")) {
        deleteAction();
      } else {
        cancelAction();
      }
    } catch (error) {
      alert(error);
    }
  };
  return [
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
    onDeleteTodo,
    isStopPriority,
    onChangeStopPriority,
    onClickEditBtn,
  ];
};
