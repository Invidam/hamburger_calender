import "../../css/pages/pages.css";
import { useAttemptLogin } from "../../hooks/user/useAttemptLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const element = <FontAwesomeIcon icon={faGithub} />;

export const LoginPage = ({ customLoginHook, history, location }) => {
  const [, , , login] = customLoginHook;

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmitNotSocial,
    authUrl,
  } = useAttemptLogin(login, history);
  return (
    <section className="page">
      <div className="page-input-box">
        <h1>Login Page</h1>
        <input
          className="page-input-box__input page-input-box__input-email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          className="page-input-box__input page-input-box__input-password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button
          className="page-input-box__btn page-input-box__btn-login"
          onClick={handleSubmitNotSocial}
        >
          Login
        </button>
        <a
          className="page-input-box__btn page-input-box__btn-github"
          href={authUrl}
        >
          {element}{" "}
          <span className="page-input-box__btn-text"> Github Login</span>
        </a>
      </div>
    </section>
  );
};
