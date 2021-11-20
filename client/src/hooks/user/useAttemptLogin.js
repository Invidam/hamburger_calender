import qs from "qs";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
const baseUrl = "https://github.com/login/oauth/authorize";
const authConfig = {
  client_id: process.env.GH_CLIENT_ID,
  allow_signup: false,
  scope: "read:user user:email",
};

export const useAttemptLogin = (login, history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitNotSocial = async (event) => {
    try {
      event.preventDefault();
      const userInfo = { email, password };
      if (!isEmail(email)) throw new Error("Entered Email form is wrong");
      if (!password) throw new Error("Password is empty");
      await login(userInfo, "notSocial");
      history.push("/");
    } catch (error) {
      alert(error);
      setEmail("");
      setPassword("");
      history.push("/login");
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
