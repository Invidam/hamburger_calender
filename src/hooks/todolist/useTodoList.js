import { useEffect, useState } from "react";
import { APIv2 } from "../../tools/API";
import { LocalStroage } from "../../tools/LocalStorage";

export const useTodoList = (user, date) => {
  const [todoList, setTodoList] = useState();
  const [isTodoListLoading, setLoad] = useState(false);
  const [sortType, setSortType] = useState("time"); // "time" or "priority"
  const getTodoList = async (sortType) => {
    try {
      if (user) {
        setLoad(true);
        const data = await APIv2.todoList(user, date).get(sortType);
        setLoad(false);
        const resTodoList = data?.data;
        if (!resTodoList) throw new Error("TodoList can't found");
        setTodoList(resTodoList);
      } else {
        const resTodoList = LocalStroage.todoList.get(sortType);
        setTodoList(resTodoList);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getTodoList();
  }, [user, date, sortType]);

  const setTodo = (todoObj) => {
    const id = todoObj.id;
    const _todoList = { ...todoList };
    return {
      create: async () => {
        _todoList[id] = todoObj;
        setTodoList(_todoList);
        if (user) await APIv2.todo(user, date).create(todoObj);
        else LocalStroage.todoList().set(_todoList);
      },
      edit: async () => {
        _todoList[id] = todoObj;
        setTodoList(_todoList);
        if (user) await APIv2.todo(user, date).edit(todoObj);
        else LocalStroage.todoList().set(_todoList);
      },
      delete: async () => {
        if (!delete _todoList[id]) throw new Error("Cannot Delete TodoItem");
        setTodoList(_todoList);
        if (user) await APIv2.todo(user, date).delete(todoObj);
        else LocalStroage.todoList().set(_todoList);
      },
    };
  };
  return [todoList, setTodo, isTodoListLoading];
};
