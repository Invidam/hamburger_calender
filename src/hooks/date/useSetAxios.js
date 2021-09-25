import axios from "axios";
import { useEffect } from "react";
export const axiosSetting = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (e) => {
      console.log("ERR", e?.response);
      if (e?.response?.status === 401) {
        console.log("ER1ROR: ", e.response);
        // alert();
        throw `401 - Unauthorized\n${e.response?.data}`;
      }
      return Promise.reject(e);
    }
  );
};

export const useSetAxios = () => {
  useEffect(() => axiosSetting(), []);
};
