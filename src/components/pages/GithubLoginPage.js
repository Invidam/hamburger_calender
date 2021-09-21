import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
export const GithubLoginPage = (props) => {
  // const {code} =
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
        const { access_token, name } = response.data;
        localStorage.setItem("access_token", access_token);
        setUser(name);
        history.push("/");
      } catch (error) {
        alert(error);
        history.push("/");
      }
    };
    getToken();
  }, [location, history]);
  return <h1>GITHUB LOGIN LOADING . . .</h1>;
};
