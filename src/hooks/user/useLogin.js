import { useEffect, useState } from "react";
import { APIv2, updateAPIHeader } from "../../tools/API";
import { LocalStroage } from "../../tools/LocalStorage";
import { getToday } from "../../tools/time";

const verifyToken = async () => {
  const { token } = LocalStroage.accessToken().get();
  const response = await APIv2.auth().verifyToken(token); //await API.post("/api/jwt/verify", { token });
  return response.data.decode;
};

export const useLogin = () => {
  const [user, setUser] = useState();
  const [isTokenLoading, setLoadInToken] = useState(true);
  const [isLoginLoading, setLoadInLoading] = useState(false);
  const [isLoginHookLoading, setLoad] = useState(true);
  useEffect(() => {
    console.log(
      "[login]TOKEN",
      isTokenLoading,
      "LOGIN",
      isLoginLoading,
      "RESULT: ",
      isTokenLoading || isLoginLoading
    );
    setLoad(isTokenLoading || isLoginLoading);
  }, [isTokenLoading, isLoginLoading]);
  const setUserInToken = async () => {
    try {
      if (LocalStroage.accessToken().isEmpty()) {
        console.log("user FIND! ");
        LocalStroage.accessToken().set(undefined);
        // throw new Error("access_token not exists.");
        console.log(
          "TOKEN",
          isTokenLoading,
          "LOGIN",
          isLoginLoading,
          "RESULT: ",
          isTokenLoading || isLoginLoading
        );
        setLoadInToken(false);
      } else {
        // setLoadInToken(true);
        const { username } = await verifyToken();
        console.log("user find! ", username);
        setLoadInToken(false);
        setUser(username);
      }
    } catch (error) {
      alert(error);
      setLoadInToken(false);
      setUser(undefined);
    }
  };
  useEffect(() => {
    console.log("USE EFFECT APPROACH");
    setUserInToken();
  }, [user]);
  const setDataInLocal = (user) => {
    try {
      console.log("TOKEN START");
      const date = getToday();
      updateAPIHeader();
      if (!LocalStroage.recordTime("wakeTime").isEmpty()) {
        const wakeTime = LocalStroage.recordTime("wakeTime").get();
        APIv2.recordTime(user, date, "wakeTime").edit(wakeTime);
        LocalStroage.recordTime("wakeTime").remove();
      }
      if (!LocalStroage.recordTime("bedTime").isEmpty()) {
        const bedTime = LocalStroage.recordTime("bedTime").get();
        APIv2.recordTime(user, date, "bedTime").edit(bedTime);
        LocalStroage.recordTime("bedTime").remove();
      }
      if (!LocalStroage.workList().isEmpty()) {
        const workList = LocalStroage.workList("workList").get();
        APIv2.workList(user, date).edit(workList);
        LocalStroage.workList().remove();
      }
      if (!LocalStroage.todoList().isEmpty()) {
        console.log("IS EMPTY TODO ");
        const todoList = LocalStroage.todoList("todoList").get();
        APIv2.todoList(user).edit(todoList);
        LocalStroage.todoList().remove();
      }
    } catch (error) {
      alert(error);
    }
  };
  const authenticated = user != null;
  const login = async (userInfo, socialType) => {
    // setUser(signIn({ email, password }));
    try {
      setLoadInLoading(true);
      // const response = await API.post(`/auth/login/${socialType}`, {
      //   userInfo,
      // });
      const response = await APIv2.auth().login(socialType, userInfo);
      const { access_token, username } = response.data;
      LocalStroage.accessToken().set(access_token);
      setUser(username);
      console.log("login success ~~~~~~~~~~~");
      if (!LocalStroage.accessToken().isEmpty()) {
        setDataInLocal(username);
        setLoadInLoading(false);
      }
    } catch (error) {
      setLoadInLoading(false);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    LocalStroage.accessToken().remove();
    updateAPIHeader();
  };

  return [user, setUser, authenticated, login, logout, isLoginHookLoading];
};
