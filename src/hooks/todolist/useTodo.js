import { useState } from "react";
import randomToken from "rand-token";
export const useTodo = (setTodo, todoItem) => {
  const [isCheck, setCheck] = useState(todoItem?.check);
  const [text, setContent] = useState(todoItem?.text);
  const [date, setDate] = useState(todoItem?.date);
  const [priority, setPriority] = useState(todoItem?.priority);

  const onClickCheck = () => setCheck(!isCheck);
  const onChangeContent = (text) => setContent(text);
  const onChangeDate = (date) => setDate(date);
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
  const onChangePriority = (value) => setPriority(value);
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
  return [
    onClickCheck,
    onChangeContent,
    onChangeDate,
    onChangePriority,
    onSubmitTodo,
  ];
};
