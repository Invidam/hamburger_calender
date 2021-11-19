import qs from "qs";
import { useEffect } from "react";
export const useAttemptGithubLogin = ({
  history,
  location,
  customLoginHook,
}) => {
  const login = customLoginHook[3];
  const getToken = async () => {
    const { code } = qs.parse(location?.search, {
      ignoreQueryPrefix: true,
    });
    try {
      const userInfo = { code };
      await login(userInfo, "github");
      history.push("/");
    } catch (error) {
      alert(error);
      history.push("/login");
    }
  };
  useEffect(() => {
    console.log("ATT GITHUB LOGIN EFFECT", location, history);
    getToken();
  }, [location, history]);
};
