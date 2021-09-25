import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
export const useAttemptGithubLogin = (props) => {
  const { history, location, customLoginHook } = props;
  const setUser = customLoginHook[1];
  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(location?.search, {
        ignoreQueryPrefix: true,
      });
      try {
        const response = await axios.post("/auth/login/github", {
          code,
        });
        const { access_token, username } = response.data;
        localStorage.setItem("access_token", access_token);
        setUser(username);
        history.push("/");
      } catch (error) {
        alert(error);
        history.push("/login");
      }
    };
    getToken();
  }, [location, history]);
};
