import { useTodo } from "../../hooks/todolist/useTodo";
import { getToday } from "../../tools/time";

export const InputTodo = ({ setTodo, isEditMode }) => {
  const [
    onClickCheck,
    onChangeContent,
    onChangeDate,
    onChangePriority,
    onSubmitTodo,
  ] = useTodo(setTodo);
  const inputBtn = isEditMode ? (
    <div>
      <button>E</button>
      <button>X</button>{" "}
    </div>
  ) : (
    <button onClick={onSubmitTodo}> S</button>
  );
  const inputElement = (
    <div>
      <input
        type="checkbox"
        name="todoCheck"
        onChange={({ target: { value } }) => onClickCheck(value)}
      ></input>
      <input
        type="text"
        name="todoContent"
        onChange={({ target: { value } }) => onChangeContent(value)}
      ></input>
      <input
        type="date"
        name="todoDate"
        min={getToday()}
        onChange={({ target: { value } }) => onChangeDate(value)}
      ></input>
      <input
        type="text"
        name="todoPriority"
        onChange={({ target: { value } }) => onChangePriority(value)}
      ></input>
      {inputBtn}
    </div>
  );
  return <div> {inputElement}</div>;
};
