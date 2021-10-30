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
    <ol className="todo-list">
      <TodoExplain
        sortTypeIdx={sortTypeIdx}
        onClickByTabIdx={onClickByTabIdx}
      />
      <Todo setTodo={setTodo} _isEditMode={true} id={-1} idx={-1} />
      {todoList
        ? Object.values(todoList).map((todoItem, idx) => {
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
  );
};
