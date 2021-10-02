import qs from "qs";
import { useEffect } from "react";
// import { API } from "../date/useSetAxios";
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
        alert(error);
        history.push("/login");
      }
    };
    try {
      // API(); API를 사용하므로 지웠음
      getToken();
    } catch (e) {
      alert(e);
    }
  }, [location, history]);
};
