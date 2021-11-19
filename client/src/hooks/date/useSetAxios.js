import axios from "axios";
import { useEffect } from "react";
export const settingAXIOS = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (e) => {
      console.log("ERR IN AXIOS SETTING", e?.response);
      if (e?.response?.status === 401) {
        console.log("ERR IN AXIOS SETTING 401: ", e.response);
        // alert();
        throw new Error(`401 - Unauthorized\n${e.response?.data}`);
      }
      console.log("ERR BUT NOT 401!");
      throw e;
    }
  );
};

export const useSetAxios = () => {
  useEffect(() => settingAXIOS(), []);
};
