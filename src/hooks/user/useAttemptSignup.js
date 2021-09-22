import qs from "qs";
import axios from "axios";
import { useState } from "react";

export const useAttemptSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAttemptSignup = async () => {
    // event.preventDefault();
    //   const { code } = req.body;
    console.log("CONNET ON REACT-REGISTER page: ");
    console.log(username, email, password);

    if (!username || !email || !password) {
      let errText = `[ERROR] ${username ? "" : "Username"}${
        !email + !password > 0 && !username ? ", " : ""
      }${email ? "" : "Email"}${!password > 0 && !email ? ", " : ""}${
        password ? "" : "Password"
      } ${!username + !email + !password > 1 ? "are" : "is"} not entered.`;
      alert(errText);
    }
    const response = await axios.post("/auth/signup", {
      username,
      email,
      password,
    });
    console.log("RES: ", response);
  };
  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleAttemptSignup,
  };
};

//
