import Loading from "react-loading";
import { useTodoList } from "../../hooks/todolist/useTodoList";
import { LoadingElement } from "../Loading";
import { InputTodo } from "./InputTodo";
import { Todo } from "./Todo";
import "../../css/todoList.css";
export const TodoList = ({ user, date }) => {
  const [todoList, setTodo, isTodoListLoading] = useTodoList(user, date);
  return isTodoListLoading ? (
    <LoadingElement text={"todoList is Loading"} />
  ) : (
    <ol className="todo-list">
      <li className="todo-item">
        {" "}
        <InputTodo setTodo={setTodo} />
      </li>
      {todoList &&
        Object.values(todoList).map((todoItem, idx) => {
          return (
            <Todo
              setTodo={setTodo}
              isEditMode={true}
              todoItem={todoItem}
              key={idx}
            />
          );
        })}
    </ol>
  );
};
