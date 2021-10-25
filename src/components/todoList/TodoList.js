// import Loading from "react-loading";
// import StarRatings from "react-star-ratings";
// import { StarRatingInput, StarRating, css } from "react-star-rating-input";

// import DatePicker from "react-datepicker";
import { useTodoList } from "../../hooks/todolist/useTodoList";
import { LoadingElement } from "../Loading";
// import { InputTodo } from "./InputTodo";
import { Todo } from "./elements/Todo";
import "../../css/todoList.css";
import { TodoExplain } from "./elements/TodoExplain";
// import { Example } from "./dateTest";

export const TodoList = ({ user, date }) => {
  const [todoList, setTodo, isTodoListLoading] = useTodoList(user, date);
  return isTodoListLoading ? (
    <LoadingElement text={"todoList is Loading"} />
  ) : (
    <ol className="todo-list">
      <TodoExplain />
      <Todo setTodo={setTodo} _isEditMode={true} id={0} />
      {todoList &&
        Object.values(todoList).map((todoItem, idx) => {
          return (
            <Todo
              setTodo={setTodo}
              _isEditMode={false}
              todoItem={todoItem}
              key={idx}
              id={idx + 1}
            />
          );
        })}
    </ol>
  );
};
