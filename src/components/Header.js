import { Link } from "react-router-dom";
import "../css/header/header.css";
export const Header = ({ date, loginHook }) => {
  const [user, setUser, authenticated, login, logout] = loginHook;
  // const user = loginHook?.user;
  console.log("HOOK", loginHook);
  const loginColumn = (
    <div className="header__column header-link">
      <Link className="header-link__elem" to="/login" loginHook={loginHook}>
        Login
      </Link>
      <Link className="header-link__elem" to="/register">
        Register
      </Link>
    </div>
  );
  const logoutColumn = (
    <div className="header__column header-link">
      <button className="header-link__elem" onClick={logout}>
        {" "}
        Logout
      </button>
      <Link className="header-link__elem" to="/register">
        {" "}
        Register
      </Link>
    </div>
  );
  return (
    <header clasName="header">
      {/* <a href="https://www.freepik.com/vectors/food">
        Food vector created by rawpixel.com - www.freepik.com */}
      {/* </a> */}
      <div className="header__row">
        <div className="header__column header-icon">
          <Link className="" to="/">
            <img
              className="header-icon__icon"
              src="https://user-images.githubusercontent.com/71889359/133923788-1e176d98-acda-47ab-9eba-3815e3903ecf.png"
            ></img>
          </Link>
        </div>
        <div className="header__column header-title">
          <Link className="" to="/">
            <h1 className=""> Hamburger App</h1>
          </Link>
        </div>
        {!authenticated ? loginColumn : logoutColumn}
      </div>
      <span className="">{date}</span>
      <span className="">{authenticated ? `Hello ${user}` : ""}</span>
    </header>
  );
};
