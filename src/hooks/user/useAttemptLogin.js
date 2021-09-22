import qs from "qs";
import axios from "axios";
import { useState } from "react";

export const useAttemptLogin = (login) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitNotSocial = async (event) => {
    try {
      event.preventDefault();
      console.log("INFO< ", email, password);
      login({ email, password });
    } catch (error) {
      alert(error);
      setEmail("");
      setPassword("");
    }
  };
  const baseUrl = "https://github.com/login/oauth/authorize";
  const authConfig = {
    client_id: "44089da06c95a868c4cb",
    allow_signup: false,
    scope: "read:user user:email",
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
