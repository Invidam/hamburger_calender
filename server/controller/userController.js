import axios from "axios";
import randomToken from "rand-token";

import jwt from "../../modules/jwt.js";
import { db } from "../routes/firebase/config.js";
const userList = new Map();
const userNameSet = new Set();
const userEmailSet = new Set();
const getUserList = async () => {
  const ref = db.ref(`users`);
  await ref.on(
    "value",
    (users) => {
      users.forEach((user) => {
        const userInfo = user.val().info;
        console.log(userInfo, typeof userInfo);

        userNameSet.add(userInfo.username);
        if (userInfo?.email) userEmailSet.add(userInfo.email);
      });
    },
    (errorObject) => console.log(errorObject)
  );
  // console.log(userList);
};
getUserList();

const isExistingUser = ({ email, username }) =>
  userNameSet.has(username) || userEmailSet.has(email);

export const signup = async (req, res) => {
  const { email, password, username } = req.body;
  if (isExistingUser({ email, username })) {
    return res.status(401).send("User has entered info already exists.");
  }
  const uid = randomToken.uid(16);
  console.log(req.body);

  const ref = db.ref(`users/${username}/info`);
  ref.set({ email, username, socialType: "", uid });
  const access_token = await jwt.sign({
    username,
  });
  return res.json({ access_token, username });
};
export const loginNotSocial = async (req, res) => {
  //   const { code } = req.body;
  const { email, password } = req.body;
  console.log("REQ DATA: ", email, password);
  //   const baseUrl = "https://github.com/login/oauth/authorize";
  //   const tokenConfig = {
  //     client_id: process.env.GH_CLIENT_ID,
  //     allow_signup: false,
  //     scope: "read:user user:email",
  //   };
  //   const authUrl = baseUrl + qs.stringify(tokenConfig);
  //   const finalUrl = await axios.get(authUrl);
  //   console.log("RES", finalUrl);

  return res.end();
};
export const loginGithub = async (req, res) => {
  const { code } = req.body;
  console.log("CONNET ON NODE-github page: ", code);
  //   const { email, password } = req.body;
  const baseUrl = "https://github.com/login/oauth/access_token";
  const tokenConfig = {
    code,
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRETS,
  };
  const header = {
    headers: {
      accept: "application/json",
    },
  };
  console.log(tokenConfig);
  const response = await axios.post(baseUrl, tokenConfig, header);
  const token = response?.data?.access_token;

  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  console.log("USER DATA: ", data);
  const access_token = await jwt.sign({
    username: data.login,
  });
  console.log("TOEKB: ", access_token);
  console.log(data.login);
  return res.json({ access_token, username: data.login });

  //github 로그인을 시도
  // 이메일과 유저네임이 모두 같은 유저에게 존재 -> X
  //1. 기존에 존재하는 username  다른 이메일->  X
  //2. 기존에 존재하는 email 다른 username-> X
  // 마지막에 검증
};
