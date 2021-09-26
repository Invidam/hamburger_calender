import axios from "axios";

export const getCustomConfig = () => {
  const token = localStorage.getItem("access_token");
  const config = {
    headers: { "x-access-token": token },
  };
  return config;
};

export const API = axios.create(getCustomConfig());

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (e) => {
    console.log("ERR", e?.response);
    if (e?.response?.status === 401) {
      console.log("ER1ROR: ", e.response);
      // alert();
      throw new Error(`401 - Unauthorized\n${e.response?.data}`);
    }
    return Promise.reject(e);
  }
);
