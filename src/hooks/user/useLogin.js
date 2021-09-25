import axios from "axios";
import { useEffect, useState } from "react";

const verifyToken = async () => {
  const { token } = JSON.parse(localStorage.getItem("access_token"));
  const response = await axios.post("/api/jwt/verify", { token });
  return response.data.decode;
};

export const useLogin = () => {
  const [user, setUser] = useState();
  const setUserInToken = async () => {
    try {
      if (!localStorage.getItem("access_token"))
        throw new Error("access_token not exists.");
      const { username } = await verifyToken();
      setUser(username);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setUserInToken();
  }, []);
  const authenticated = user != null;
  const login = async ({ email, password }) => {
    // setUser(signIn({ email, password }));
    try {
      const response = await axios.post(`/auth/login/notSocial`, {
        email,
        password,
      });
      const { access_token, username } = response.data;
      localStorage.setItem("access_token", JSON.stringify(access_token));
      setUser(username);
    } catch (error) {
      alert(error);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  return [user, setUser, authenticated, login, logout];
};
