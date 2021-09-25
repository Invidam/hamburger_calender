// import logo from './logo.svg';
import "./css/App.css";
import "./css/calendar.css";
import { changeFormatYYYYMMDD } from "./tools/time";

import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { Header } from "./components/Header";
import { useLogin } from "./hooks/user/useLogin";
import { useSetDate } from "./hooks/date/useSetDate";
import { GithubLoginPage } from "./components/pages/GithubLoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import { useSetAxios } from "./hooks/date/useSetAxios";

const USER = "TEST";
function App(props) {
  useSetAxios();
  const updateDateHook = useSetDate();
  const date = changeFormatYYYYMMDD(updateDateHook[0], false);
  const customLoginHook = useLogin();
  const user = customLoginHook[0];
  console.log("APP USER: ", user);

  return (
    <Router>
      <Header date={date} customLoginHook={customLoginHook} />
      <main>
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
            render={({ history, location }) => (
              <LoginPage
                history={history}
                location={location}
                customLoginHook={customLoginHook}
              />
            )}
          />
          <Route
            path="/signup"
            render={({ history, location }) => (
              <SignupPage history={history} location={location} />
            )}
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
