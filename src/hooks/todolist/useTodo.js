import { useState } from "react";
import randomToken from "rand-token";
export const useTodo = (setTodo, todoItem) => {
  const [isCheck, setCheck] = useState(todoItem?.check);
  const [text, setText] = useState(todoItem?.text);
  const [date, setDate] = useState(todoItem?.date);
  const [priority, setPriority] = useState(todoItem?.priority);

  const onClickCheck = () => setCheck(!isCheck);
  const onChangeText = (text) => {
    console.log("TEXT: ", text);
    setText(text);
  };
  const onChangeDate = (date) => setDate(date);
  const onChangePriority = (value) => setPriority(value);
  //   const onCheck = (event) => {
  //     try {
  //       event.preventDefault();
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
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
  const onEditTodo = (event) => {
    try {
      event.preventDefault();
      let willUpdate = true;
      const id = todoItem?.id;
      const _todoItem = { isCheck, text, date, priority, id };
      if (typeof validator === "function") willUpdate = validator(_todoItem);
      if (willUpdate) {
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
    onClickCheck,
    onChangeText,
    onChangeDate,
    onChangePriority,
    onSubmitTodo,
    onEditTodo,
    onDeleteTodo,
  ];
};
