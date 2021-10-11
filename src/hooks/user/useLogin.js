import { useEffect, useState } from "react";
import { API, APIv2, updateAPIHeader } from "../../tools/API";
import { LocalStroage } from "../../tools/LocalStorage";
import { getToday } from "../../tools/time";

const verifyToken = async () => {
  const { token } = LocalStroage.accessToken().get();
  const response = await APIv2.auth().verifyToken(token); //await API.post("/api/jwt/verify", { token });
  return response.data.decode;
};

export const useLogin = () => {
  const [user, setUser] = useState();
  const [isLoginHookLoading, setLoad] = useState(true);
  const setUserInToken = async () => {
    try {
      if (LocalStroage.accessToken().isEmpty()) {
        console.log("user FIND! ");
        LocalStroage.accessToken().set(undefined);
        // throw new Error("access_token not exists.");
      } else {
        const { username } = await verifyToken();
        console.log("user find! ", username);
        setUser(username);
      }
      if (isLoginHookLoading) setLoad(false);
    } catch (error) {
      alert(error);
      setUser(undefined);
    }
  };
  useEffect(() => {
    console.log("USE EFFECT APPROACH");
    setUserInToken();
  }, []);
  const setDataInLocal = (user) => {
    try {
      const date = getToday();
      updateAPIHeader();
      if (LocalStroage.recordTime("wakeTime").isEmpty()) {
        const wakeTime = LocalStroage.recordTime("wakeTime").get();
        APIv2.recordTime(user, date, "wakeTime").edit(wakeTime);
        LocalStroage.recordTime("wakeTime").remove();
      }
      if (LocalStroage.recordTime("bedTime").isEmpty()) {
        const bedTime = LocalStroage.recordTime("bedTime").get();
        APIv2.recordTime(user, date, "bedTime").edit(bedTime);
        LocalStroage.recordTime("bedTime").remove();
      }
      if (LocalStroage.workList().isEmpty()) {
        const workList = LocalStroage.workList("workList").get();
        APIv2.workList(user, date, "workList").edit(workList);
        LocalStroage.workList("workList").remove();
      }
    } catch (error) {
      alert(error);
    }
  };
  const authenticated = user != null;
  const login = async (userInfo, socialType) => {
    // setUser(signIn({ email, password }));
    try {
      setLoad(true);
      // const response = await API.post(`/auth/login/${socialType}`, {
      //   userInfo,
      // });
      const response = await APIv2.auth().login(socialType, userInfo);
      const { access_token, username } = response.data;
      LocalStroage.accessToken().set(access_token);
      setUser(username);
      setLoad(false);
      if (!LocalStroage.accessToken().isEmpty()) setDataInLocal(username);
    } catch (error) {
      setLoad(false);
      console.log("WHY NOT ERR");
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
