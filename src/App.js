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

const USER = "TEST";
function App() {
  // const [value, onChange] = useState(new Date());
  // const [test, testtest] = useState(0);
  // const clickDay = (event, value) => alert("Clicked day: ", value);
  // const mark = ["2021-09-12", "2021-09-13", "2021-09-14"];
  const updateDateHook = useState(new Date());
  const date = changeFormatYYYYMMDD(updateDateHook[0]);
  //{ user, setUser, authenticated, login, logout }
  const loginHook = useLogin();
  const user = loginHook[0];
  console.log("USER: ", user);
  return (
    <Router>
      <Header date={date} loginHook={loginHook} />
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} user={user} />
          <Route
            path="/login"
            render={(props) => <LoginPage loginHook={loginHook} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <footer>footer</footer>
    </Router>
  );
}

export default App;
