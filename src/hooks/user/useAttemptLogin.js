import { useState } from "react";

export const useAttemptLogin = (login) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      login({ email, password });
    } catch (error) {
      alert(error);
      setEmail("");
      setPassword("");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};
