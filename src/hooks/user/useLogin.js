import { useEffect, useState } from "react";
import { API, updateAPIHeader } from "../../tools/axiosSetting";
import { getToday } from "../../tools/time";

const verifyToken = async () => {
  const { token } = JSON.parse(localStorage.getItem("access_token"));
  const response = await API.post("/api/jwt/verify", { token });
  return response.data.decode;
};

export const useLogin = () => {
  const [user, setUser] = useState();
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
      setUser(username);
    } catch (error) {
      console.warn(error);
    }
  };
  const setDataInLocal = (user) => {
    try {
      const date = getToday();
      updateAPIHeader();
      if (localStorage.getItem("wakeTime")) {
        const wakeTime = JSON.parse(localStorage.getItem("wakeTime"));
        console.log("TO set Data: waketime", wakeTime);
        API.post(`/api/${user}/${date}/worklist/record-time/wakeTime`, {
          value: wakeTime,
        });
        localStorage.removeItem("wakeTime");
      }
      if (localStorage.getItem("bedTime")) {
        const bedTime = JSON.parse(localStorage.getItem("bedTime"));
        console.log("TO set Data: bedTime", bedTime);
        API.post(`/api/${user}/${date}/worklist/record-time/bedTime`, {
          value: bedTime,
        });
        localStorage.removeItem("bedTime");
      }
      if (localStorage.getItem("workList")) {
        const workList = JSON.parse(localStorage.getItem("workList"));
        console.log("TO set Data: waketime", workList);
        API.post(`/api/${user}/${date}/worklist/record-time/workList`, {
          value: workList,
        });
        localStorage.removeItem("workList");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (!user) setUserInToken();
  }, [user]);
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
