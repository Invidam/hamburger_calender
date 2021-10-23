import Loading from "react-loading";
import { useTodoList } from "../../hooks/todolist/useTodoList";
import { LoadingElement } from "../Loading";
import { InputTodo } from "./InputTodo";

export const TodoList = ({ user, date }) => {
  const [todoList, setTodo, isTodoListLoading] = useTodoList(user, date);
  return isTodoListLoading ? (
    <LoadingElement text={"todoList is Loading"} />
  ) : (
    <div>
      <ol>
        <li>
          {" "}
          <InputTodo setTodo={setTodo} />
        </li>
        {todoList &&
          Object.values(todoList).map((todoItem, idx) => {
            return <li> {JSON.stringify(todoItem)}</li>;
          })}
      </ol>
    </div>
  );
};
