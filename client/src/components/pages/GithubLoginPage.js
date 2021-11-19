import { useAttemptGithubLogin } from "../../hooks/user/useAttemptGithubLogin";

export const GithubLoginPage = (props) => {
  // const {code} =
  useAttemptGithubLogin(props);
  return <h1>GITHUB LOGIN LOADING . . .</h1>;
};
