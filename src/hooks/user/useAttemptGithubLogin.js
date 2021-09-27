import qs from "qs";
import { useEffect } from "react";
import { axiosSetting } from "../date/useSetAxios";
export const useAttemptGithubLogin = (props) => {
  const { history, location, customLoginHook } = props;
  const login = customLoginHook[3];
  useEffect(() => {
    const getToken = async () => {
      const { code } = qs.parse(location?.search, {
        ignoreQueryPrefix: true,
      });
      try {
        const userInfo = { code };
        login(userInfo, "github");
        history.push("/");
      } catch (error) {
        console.log("GITERR", error);
        alert(error);
        history.push("/login");
      }
    };
    try {
      axiosSetting();
      getToken();
    } catch (e) {
      console.log("HERE? ");
      alert(e);
    }
  }, [location, history]);
};