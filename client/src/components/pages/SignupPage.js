import "../../css/pages/pages.css";
import { useAttemptSignup } from "../../hooks/user/useAttemptSignup";
export const SignupPage = (props) => {
  const {
    username,
    setUsername,
    email,
    password,
    setEmail,
    setPassword,
    handleAttemptSignup,
  } = useAttemptSignup(props);
  return (
    <section className="page">
      <div className="page-input-box">
        <h1 className="setting-title">Sign up Page </h1>
        <div className="page-input__form">
          <input
            value={username}
            type="text"
            className="page-input-box__input page-input-box__input-username"
            placeholder="Username"
            onChange={({ target: { value } }) => setUsername(value)}
          />
          <input
            value={email}
            className="page-input-box__input page-input-box__input-email"
            type="email"
            placeholder="Email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <input
            value={password}
            type="password"
            className="page-input-box__input page-input-box__input-password"
            placeholder="Password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <button
          className="page-input-box__btn page-input-box__btn-login"
          onClick={handleAttemptSignup}
        >
          Sign up
        </button>
      </div>
    </section>
  );
};
