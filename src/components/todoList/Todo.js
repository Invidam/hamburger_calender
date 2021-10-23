import { useTodo } from "../../hooks/todolist/useTodo";
import { getToday } from "../../tools/time";

export const Todo = ({ setTodo, isEditMode, todoItem }) => {
  const [
    onClickCheck,
    onChangeText,
    onChangeDate,
    onChangePriority,
    onSubmitTodo,
    onEditTodo,
    onDeleteTodo,
  ] = useTodo(setTodo, todoItem);
  const inputBtn = isEditMode ? (
    <div classNAme="todo__btn-box">
      <button className="todo__btn todo__btn-edit" onClick={onEditTodo}>
        E
      </button>
      <button className="todo__btn todo__btn-delete" onClick={onDeleteTodo}>
        X
      </button>{" "}
    </div>
  ) : (
    <button className="todo__btn todo__btn-add" onClick={onSubmitTodo}>
      {" "}
      S
    </button>
  );
  const inputElement = (
    <div className="todo-input">
      <input
        className="todo-input__checkbox todo-input__content"
        type="checkbox"
        name="todoCheck"
        defaultValue={todoItem?.isCheck}
        onChange={({ target: { value } }) => onClickCheck(value)}
      ></input>
      <input
        className="todo-input__text todo-input__content"
        type="text"
        name="todoText"
        defaultValue={todoItem?.text}
        onChange={({ target: { value } }) => onChangeText(value)}
      ></input>
      <input
        className="todo-input__date todo-input__content"
        type="date"
        name="todoDate"
        defaultValue={todoItem?.date}
        min={getToday()}
        onChange={({ target: { value } }) => onChangeDate(value)}
      ></input>
      <input
        className="todo-input__priority todo-input__content"
        type="text"
        name="todoPriority"
        defaultValue={todoItem?.priority}
        onChange={({ target: { value } }) => onChangePriority(value)}
      ></input>
      {inputBtn}
    </div>
  );
  return (
    <li className="todo-item" key={"_" + todoItem?.id}>
      {" "}
      {inputElement}
    </li>
  );
};
