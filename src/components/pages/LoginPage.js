import { useState } from "react";
import "../../css/pages/loginPage.css";
import { useAttemptLogin } from "../../hooks/user/useAttemptLogin";
export const LoginPage = ({ loginHook }) => {
  const [user, setUser, authenticated, login, logout] = loginHook;
  console.log("HOOK", loginHook);
  const { email, password, setEmail, setPassword, handleSubmit } =
    useAttemptLogin(login);
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
      <button onClick={handleSubmit}>Login</button>
    </section>
  );
};
