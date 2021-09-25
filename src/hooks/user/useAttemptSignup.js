import qs from "qs";
import axios from "axios";
import isEmail from "validator/lib/isEmail";
import { useState } from "react";

export const useAttemptSignup = ({ history, locaiton }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAttemptSignup = async () => {
    try {
      // event.preventDefault();
      //   const { code } = req.body;
      console.log("CONNET ON REACT-REGISTER page: ");
      console.log(username, email, password);
      if (!isEmail(email)) {
        throw "Unexpected Email Form. Please chek your email.";
      }
      if (!username || !email || !password) {
        let errText = `[ERROR] ${username ? "" : "Username"}${
          !email + !password > 0 && !username ? ", " : ""
        }${email ? "" : "Email"}${!password > 0 && !email ? ", " : ""}${
          password ? "" : "Password"
        } ${!username + !email + !password > 1 ? "are" : "is"} not entered.`;
        throw errText;
      }
      const response = await axios.post("/auth/signup", {
        username,
        email,
        password,
      });
      console.log("RES: ", response);
      alert(`Sign up complete. \nLogin your entered email & password`);
      history.push("/login");
    } catch (error) {
      console.log("CATCH", error);
      alert(error);
    }
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
