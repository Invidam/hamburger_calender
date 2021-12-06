import { useTodoList } from "../../hooks/todolist/useTodoList";
import { LoadingElement } from "../Loading";
import { Todo } from "./elements/Todo";
import "../../css/todoList.css";
import { TodoExplain } from "./elements/TodoExplain";
export const INIT_SORT_TYPE_IDX = 1,
  SORT_TYPES = 2,
  SORT_TYPE_CNT = 2;
export const TodoList = ({ user, date }) => {
  // const [sortTypeIdx, onClickByTabIdx] = todoSortHook;
  const [todoList, setTodo, isTodoListLoading, sortTypeIdx, onClickByTabIdx] =
    useTodoList(user, INIT_SORT_TYPE_IDX, SORT_TYPES, SORT_TYPE_CNT);
  console.log("TODOLIST: ", todoList, typeof todoList);
  return isTodoListLoading ? (
    <LoadingElement text={"todoList is Loading"} />
  ) : (
    <div className="todo-box">
      <ol className="todo-list todo-list__non-item">
        <TodoExplain
          sortTypeIdx={sortTypeIdx}
          onClickByTabIdx={onClickByTabIdx}
        />
        <Todo setTodo={setTodo} _isEditMode={true} id={-1} idx={-1} />
      </ol>
      <ol className="todo-list todo-list__item">
        {todoList
          ? Object.entries(todoList).map(([idx, todoItem]) => {
              return (
                <Todo
                  setTodo={setTodo}
                  _isEditMode={false}
                  todoItem={todoItem}
                  key={idx}
                  id={idx}
                  idx={idx}
                />
              );
            })
          : ""}
      </ol>
    </div>
  );
};
