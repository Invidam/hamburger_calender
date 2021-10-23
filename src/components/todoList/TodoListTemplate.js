// import "../../css/workList/workList.css";
// import { WorkList } from "./WorkList";
// import { faCog } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TodoList } from "./TodoList";

export const TodoListTemplate = ({ user, date }) => {
  return (
    <div className="todoList">
      <header className="todoList-header">
        <h1>Make Hamburger</h1>
        <TodoList user={user} date={date} />
      </header>
    </div>
  );
};
