import axios from "axios";
import qs from "qs";
import { useEffect } from "react";
export const GithubLoginPage = (props) => {
  // const {code} =
  console.log("PROPS: ", props);
  const { history, location, customLoginHook } = props;
  console.log("locat", location?.search);
  useEffect(() => {
    const { setUser } = customLoginHook;
    const getToken = async () => {
      const { code } = qs.parse(location?.search, {
        ignoreQueryPrefix: true,
      });
      try {
        const { data } = await axios.post("/auth/github-login", {
          code,
        });
        localStorage.setItem("data", data);
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
