import { useEffect, useState } from "react";
import { SORT_TYPE_CNT } from "../../components/todoList/TodoList";
// import { SORT_TYPE_CNT } from "../../components/todoList/TodoListTemplate";
import { APIv2 } from "../../tools/API";
import { LocalStroage } from "../../tools/LocalStorage";

const makeSortTypeStr = (idx) => {
  let ret = {};
  ret["type"] = Math.floor(idx / SORT_TYPE_CNT) === 0 ? "date" : "priority";
  ret["direction"] = idx % 2 === 0 ? "up" : "down";
  return ret;
};
export const useTodoList = (user, initSortTypeIdx, sortTypeCnt, sortTypes) => {
  const [todoList, setTodoList] = useState();
  const [isTodoListLoading, setLoad] = useState(true);
  const [sortTypeIdx, setSortTypeIdx] = useState(initSortTypeIdx);
  const getNextSortType = (idx) =>
    (idx + 1) % sortTypes === 0 ? idx - sortTypes + 1 : idx + 1;
  const onClickByTabIdx = (tabIdx) => {
    // 같은 소속이었다면
    setLoad(true);
    if (Math.floor(sortTypeIdx / sortTypes) === tabIdx)
      setSortTypeIdx(getNextSortType(sortTypeIdx));
    else setSortTypeIdx(tabIdx * sortTypeCnt + 1);
  };
  const getTodoList = async (user, sortTypeIdx) => {
    try {
      if (user) {
        console.log("TODO SORT", sortTypeIdx);
        const data = await APIv2.todoList(user).get(
          makeSortTypeStr(sortTypeIdx)
        );
        const resTodoList = data?.data;
        console.log("INDI, RES TODO LIST: ", resTodoList);
        if (!data) throw new Error("TodoList can't found");
        setTodoList(resTodoList);
        setLoad(false);
      } else {
        const resTodoList = LocalStroage.todoList().get();
        console.log("USEWORKLIST DATA NO CATCH [][] AFT");
        setTodoList(resTodoList);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getTodoList(user, sortTypeIdx);
  }, [user, sortTypeIdx]);
  const setTodo = (todoObj, idx) => {
    // const id = todoObj.id;
    //const _todoList = { ...todoList };
    let _todoList = todoList.concat();
    return {
      create: async () => {
        //_todoList[id] = todoObj;
        // _todoList.push([id, todoObj]);
        _todoList.push(todoObj);
        setTodoList(_todoList);
        if (user) await APIv2.todo(user).create(todoObj);
        else LocalStroage.todoList().set(_todoList);
      },
      edit: async () => {
        // _todoList[idx] = [id, todoObj];

        _todoList[idx] = todoObj;
        setTodoList(_todoList);
        if (user) await APIv2.todo(user).edit(todoObj);
        else LocalStroage.todoList().set(_todoList);
      },
      delete: async () => {
        // if (!delete _todoList[id]) throw new Error("Cannot Delete TodoItem");
        _todoList = _todoList.filter((el, elemIdx) => elemIdx !== idx);
        setTodoList(_todoList);
        if (user) await APIv2.todo(user).delete(todoObj);
        else LocalStroage.todoList().set(_todoList);
      },
    };
  };
  return [todoList, setTodo, isTodoListLoading, sortTypeIdx, onClickByTabIdx];
};
