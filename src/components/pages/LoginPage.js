import { useState } from "react";
import "../../css/pages/loginPage.css";
import { useAttemptLogin } from "../../hooks/user/useAttemptLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const element = <FontAwesomeIcon icon={faGithub} />;

export const LoginPage = ({ customLoginHook }) => {
  const [user, setUser, authenticated, login, logout] = customLoginHook;

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmitNotSocial,
    authUrl,
  } = useAttemptLogin(login);
  return (
    <section className="login-page">
      <div className="login-box">
        <h1>Login Page</h1>
        <input
          className="login-box__input login-box__input-email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          className="login-box__input login-box__input-password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button
          className="login-box__btn login-box__btn-login"
          onClick={handleSubmitNotSocial}
        >
          Login
        </button>
        <a className="login-box__btn login-box__btn-github" href={authUrl}>
          {element} <span className="login-box__btn-text"> Github Login</span>
        </a>
      </div>
    </section>
  );
};
