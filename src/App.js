// import logo from './logo.svg';
import "./css/App.css";
import { WorkListTemplate } from "./components/worklist/WorkListTemplate";
import "./css/calendar.css";
import { CalendarTemplate } from "./components/calendar/CalendarTemplate";
import { useUpdateTime } from "./hooks/workList/time/useUpdateTime";
import { useUpdateWork } from "./hooks/workList/work/useUpdateWork";
import { useEffect, useState } from "react";
import { changeFormatYYYYMMDD } from "./tools/time";
import axios from "axios";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { Header } from "./components/Header";
import { useLogin } from "./hooks/user/useLogin";
import { useSetDate } from "./hooks/date/useSetDate";
import { GithubLoginPage } from "./components/pages/GithubLoginPage";

const USER = "TEST";
function App() {
  // const [value, onChange] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  const updateDateHook = useSetDate();
  const date = changeFormatYYYYMMDD(updateDateHook[0], false);
  // const [t1, t2] = useSetDate();
  // console.log(t1, t2);
  //{ user, setUser, authenticated, login, logout }
  const customLoginHook = useLogin();
  const user = customLoginHook[0];
  console.log("USER: ", user);
  return (
    <Router>
      <Header date={date} customLoginHook={customLoginHook} />
      <main>
        <button
          onClick={() =>
            axios.get("/auth/hello").then((res) => console.log("RES ", res))
          }
        >
          CLICK
        </button>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage user={user} updateDateHook={updateDateHook} />
            )}
          />
          <Route
            path="/login"
            render={() => <LoginPage customLoginHook={customLoginHook} />}
          />
          <Route
            path="/github-login"
            // component={GithubLoginPage}
            render={({ history, location }) => (
              <GithubLoginPage
                history={history}
                location={location}
                customLoginHook={customLoginHook}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <footer>footer</footer>
    </Router>
  );
}

export default App;
