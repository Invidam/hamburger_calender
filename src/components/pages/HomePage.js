// import logo from '../logo.svg';
// import "../../css/App.css";
import { WorkListTemplate } from "../worklist/WorkListTemplate";
import "../../css/calendar.css";
import { CalendarTemplate } from "../calendar/CalendarTemplate";
import { ListViewTemplate } from "../listview/ListViewTemplate";
import { TodoListTemplate } from "../todoList/TodoListTemplate";

export const HomePage = ({ user, updateDateHook, targetSetting }) => {
  // const [date, setDate] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  // const updateDateHook = useState(new Date());
  const date = updateDateHook[0];
  //const [workList, setWork, isWorkListLoading]
  const setDate = updateDateHook[1];

  return (
    <div className="main-box">
      <section>
        <article>
          <CalendarTemplate user={user} updateDateHook={updateDateHook} />
        </article>
        <article>
          <ListViewTemplate
            user={user}
            date={date}
            setDate={setDate}
            targetSetting={targetSetting}
          />
        </article>
      </section>
      <section>
        <article>
          <WorkListTemplate
            user={user}
            date={date}
            targetSetting={targetSetting}
          />
        </article>
        <article>
          <TodoListTemplate user={user} date={date} />
        </article>
      </section>
    </div>
  );
};
