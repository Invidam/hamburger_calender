import { Link } from "react-router-dom";
import "../css/header/header.css";
import { changeFormatYYYYMMDD } from "../tools/time";
import { CalendarTemplate } from "./calendar/CalendarTemplate";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCog } from "@fortawesome/free-solid-svg-icons";

// const element = (
//   <FontAwesomeIcon icon={faUserCog} size="2x" style={{ fontSize: `18px` }} />
// );

export const Header = ({ updateDateHook, customLoginHook }) => {
  const date = updateDateHook[0];
  const [user, , authenticated, , logout] = customLoginHook;

  const loginColumn = (
    <div className="header__column header-link">
      <Link
        className="header-link__elem"
        to="/login"
        // customLoginHook={customLoginHook}
      >
        Log In
      </Link>
      <Link className="header-link__elem" to="/signup">
        Sign Up
      </Link>
    </div>
  );
  const logoutColumn = (
    <div className="header__column header-link">
      <button className="header-link__elem" onClick={logout}>
        Log Out
      </button>
      <Link className="header-link__elem" to="/setting">
        {/* Log Out */}
        Setting
        {/* {element} */}
      </Link>
    </div>
  );
  return (
    <header className="header">
      {/* <a href="https://www.freepik.com/vectors/food">
        Food vector created by rawpixel.com - www.freepik.com */}
      {/* </a> */}
      <div className="header__row">
        <div className="header__column header-icon">
          <Link className="" to="/">
            <img
              alt="app-icon"
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
      <div className="">
        {date}

        <CalendarTemplate user={user} updateDateHook={updateDateHook} />
      </div>
      <span className="">{authenticated ? `Hello ${user}` : ""}</span>
    </header>
  );
};
