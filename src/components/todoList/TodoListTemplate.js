// import "../../css/workList/workList.css";
// import { WorkList } from "./WorkList";
// import { faCog } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TodoList } from "./TodoList";

export const TodoListTemplate = ({ user, date }) => {
  return (
    <div className="todo-list__template">
      <header className="todo-list__header">
        <h1>Make TodoList</h1>
      </header>
      <TodoList user={user} date={date} />
    </div>
  );
};
