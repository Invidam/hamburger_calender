// import logo from './logo.svg';
import "./css/App.css";
import "./css/calendar.css";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { LoginPage } from "./components/pages/LoginPage";
import { HomePage } from "./components/pages/HomePage";
import { Header } from "./components/Header";
import { useLogin } from "./hooks/user/useLogin";
import { useSetDate } from "./hooks/date/useSetDate";
import { GithubLoginPage } from "./components/pages/GithubLoginPage";
import { SignupPage } from "./components/pages/SignupPage";
import { SettingPage } from "./components/pages/SettingPage";
import { useTargetSetting } from "./hooks/user/useTargetSetting";
import { LoadingElement } from "./components/Loading";
import { Footer } from "./components/Footer";

function App() {
  // useSetAxios();
  console.log("[App] START-----------------------------------------");
  const updateDateHook = useSetDate();
  const customLoginHook = useLogin();
  const [user, , isLoggedIn, , , isLoginHookLoading] = customLoginHook;
  const updateSettingHook = useTargetSetting(user, isLoginHookLoading);
  const { targetSetting, isSettingHookLoading } = updateSettingHook;
  console.log("[APP] USER: ", user);
  const isLoading = () => isLoginHookLoading || isSettingHookLoading;
  console.log(
    "[APP] IS Loading? ",
    isLoading(),
    "login",
    isLoginHookLoading,
    user,
    "setting",
    isSettingHookLoading,
    targetSetting
  );
  return isLoading() ? (
    <LoadingElement text={"App Loading. . ."} />
  ) : (
    <Router>
      <Header
        updateDateHook={updateDateHook}
        customLoginHook={customLoginHook}
      />
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                user={user}
                targetSetting={targetSetting}
                updateDateHook={updateDateHook}
              />
            )}
          />
          <Route
            path="/login"
            render={({ history, location }) => {
              if (isLoggedIn) {
                history.push("/");
                return <NotFoundPage />;
              } else
                return (
                  <LoginPage
                    history={history}
                    location={location}
                    customLoginHook={customLoginHook}
                  />
                );
            }}
          />
          <Route
            path="/signup"
            render={({ history, location }) => {
              if (isLoggedIn) {
                history.push("/");
                // alert("You are already logged in.");
                return <NotFoundPage />;
              } else
                return <SignupPage history={history} location={location} />;
            }}
          />
          <Route
            path="/setting"
            render={({ history, location }) => {
              if (!isLoggedIn) {
                history.push("/");
                // alert("You are not logged in.");
                return <NotFoundPage />;
              } else
                return (
                  <SettingPage
                    user={user}
                    history={history}
                    location={location}
                    updateSettingHook={updateSettingHook}
                  />
                );
            }}
          />
          <Route
            path="/github-login"
            render={({ history, location }) => {
              if (isLoggedIn) {
                history.push("/");
                // alert("You are already logged in.");
                return <NotFoundPage />;
              } else
                return (
                  <GithubLoginPage
                    history={history}
                    location={location}
                    customLoginHook={customLoginHook}
                  />
                );
            }}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
