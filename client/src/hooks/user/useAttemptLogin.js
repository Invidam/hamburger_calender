import { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { API } from "../../tools/API";
// const baseUrl = "https://github.com/login/oauth/authorize";
// const authConfig = {
//   client_id: "44089da06c95a868c4cb",
//   allow_signup: false,
//   scope: "read:user user:email",
// };
// console.log("COMPARE: ", process.env.GH_CLIENT_ID, "44089da06c95a868c4cb");

export const useAttemptLogin = (login, history) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUrl, setAuthUrl] = useState("");
  const [isLoginPageLoading, setLoad] = useState(true);
  console.log("RES FIRST LOAD", isLoginPageLoading);
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
  const getGithubAuthUrl = async () => {
    if (!isLoginPageLoading) setLoad(true);
    const response = await API.auth().getGithubAuthUrl();
    console.log("AUTH RES: ", response?.data);
    setLoad(false);
    setAuthUrl(response?.data?.authUrl);
  };

  useEffect(() => {
    console.log("RES GO TO GET", authUrl, isLoginPageLoading);
    getGithubAuthUrl();
    // return () => setLoad(false);
  }, []);
  useEffect(() => console.log("RES CHANGE: ", authUrl), [authUrl]);
  useEffect(
    () => console.log("RES LOAD CHANGE: ", isLoginPageLoading),
    [isLoginPageLoading]
  );
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmitNotSocial,
    authUrl,
    isLoginPageLoading,
  };
};
