import { useEffect, useState } from "react";
import { API, APIv2, updateAPIHeader } from "../../tools/API";
import { LocalStroage } from "../../tools/LocalStorage";
import { getToday } from "../../tools/time";

const verifyToken = async () => {
  const { token } = JSON.parse(localStorage.getItem("access_token"));
  const response = await API.post("/api/jwt/verify", { token });
  return response.data.decode;
};

export const useLogin = () => {
  const [user, setUser] = useState("Loading");
  const setUserInToken = async () => {
    try {
      if (
        !localStorage.getItem("access_token") ||
        localStorage.getItem("access_token") === "undefined"
      ) {
        localStorage.setItem("access_token", "undefined");
        throw new Error("access_token not exists.");
      }
      const { username } = await verifyToken();
      console.log("user find! ", username);
      setUser(username);
    } catch (error) {
      setUser(undefined);
      console.warn(error);
    }
  };
  useEffect(() => {
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
        APIv2.workList(user, date, "workList").update(workList);
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
      const response = await API.post(`/auth/login/${socialType}`, {
        userInfo,
      });
      const { access_token, username } = response.data;
      localStorage.setItem("access_token", JSON.stringify(access_token));
      setUser(username);
      if (localStorage.getItem("access_token")) setDataInLocal(username);
    } catch (error) {
      console.log("WHY NOT ERR");
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    updateAPIHeader();
  };

  return [user, setUser, authenticated, login, logout];
};
