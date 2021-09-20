import { useState } from "react";
import "../../css/pages/loginPage.css";
import { useAttemptLogin } from "../../hooks/user/useAttemptLogin";
export const LoginPage = ({ customLoginHook }) => {
  const [user, setUser, authenticated, login, logout] = customLoginHook;

  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmitNotSocial,
    handleAttemptGithubLogin,
  } = useAttemptLogin(login);
  return (
    <section>
      <input
        value={email}
        type="email"
        placeholder="Input Email Address"
        onChange={({ target: { value } }) => setEmail(value)}
      />
      <input
        value={password}
        type="password"
        placeholder="Input Password"
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button onClick={handleSubmitNotSocial}>Login</button>
      <a href={handleAttemptGithubLogin()}>GITHUB LOGIN</a>
    </section>
  );
};
