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
  const handleAttemptGithubLogin = () => {
    // event.preventDefault();
    //   const { code } = req.body;
    console.log("CONNET ON REACT-github page: ");
    //   const { email, password } = req.body;
    const baseUrl = "https://github.com/login/oauth/authorize";
    const authConfig = {
      client_id: "44089da06c95a868c4cb",
      allow_signup: false,
      scope: "read:user user:email",
    };
    console.log("CONFIG", authConfig);
    const authUrl = baseUrl + "?" + qs.stringify(authConfig);
    console.log("url", authUrl);
    return authUrl;
    // const finalUrl = await axios.get(authUrl);
    // console.log("RES", finalUrl);
    //   return res.redirect(finalUrl);
    //React로 옮기기!!
    // axios.get(`/auth/login/github`);
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmitNotSocial,
    handleAttemptGithubLogin,
  };
};
