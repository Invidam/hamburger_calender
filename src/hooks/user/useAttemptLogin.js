import qs from "qs";
import { useState } from "react";

const baseUrl = "https://github.com/login/oauth/authorize";
const authConfig = {
  client_id: "44089da06c95a868c4cb",
  allow_signup: false,
  scope: "read:user user:email",
};

export const useAttemptLogin = (login, history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitNotSocial = async (event) => {
    try {
      event.preventDefault();
      login({ email, password });
      history.push("/");
    } catch (error) {
      alert(error);
      setEmail("");
      setPassword("");
    }
  };
  const authUrl = baseUrl + "?" + qs.stringify(authConfig);
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmitNotSocial,
    authUrl,
  };
};
