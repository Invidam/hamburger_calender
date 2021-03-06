import isEmail from "validator/lib/isEmail";
import { useState } from "react";
import { API } from "../../tools/API";

const isUserName = (username) => !/[^\w]/.exec(username);

export const useAttemptSignup = ({ history, locaiton }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleAttemptSignup = async () => {
    try {
      console.log("CONNET ON REACT-REGISTER page: ");
      console.log(username, email, password);
      if (!isEmail(email) || !isUserName(username)) {
        let errText = "";
        if (!isEmail(email)) errText += "Email";
        if (!isEmail(email) && !isUserName(username)) errText += " and ";
        if (!isUserName(username)) errText += "UserName";
        throw new Error(
          `Unexpected ${errText} Form. Please chek your ${errText}.`
        );
      }
      if (!username || !email || !password) {
        let errText = `[ERROR] ${username ? "" : "Username"}${
          !email + !password > 0 && !username ? ", " : ""
        }${email ? "" : "Email"}${!password > 0 && !email ? ", " : ""}${
          password ? "" : "Password"
        } ${!username + !email + !password > 1 ? "are" : "is"} not entered.`;
        throw errText;
      }
      await API.auth().signup({
        username,
        email,
        password,
      });
      // await API.post("/auth/signup", {
      //   username,
      //   email,
      //   password,
      // });
      alert(`Sign up complete. \nLogin your entered email & password`);
      history.push("/login");
    } catch (error) {
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
