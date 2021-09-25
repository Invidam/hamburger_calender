import "../../css/pages/loginPage.css";
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
    <section className="login-page">
      <div className="login-box">
        <h1>Sign up Page</h1>

        <input
          value={username}
          type="text"
          className="login-box__input login-box__input-username"
          placeholder="Username"
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <input
          value={email}
          className="login-box__input login-box__input-email"
          type="email"
          placeholder="Email"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          value={password}
          type="password"
          className="login-box__input login-box__input-password"
          placeholder="Password"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <button
          className="login-box__btn login-box__btn-login"
          onClick={handleAttemptSignup}
        >
          Sign up
        </button>
      </div>
    </section>
  );
};
