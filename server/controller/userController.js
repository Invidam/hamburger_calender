import axios from "axios";
import randomToken from "rand-token";
import bcrypt from "bcrypt";
import jwt from "../../modules/jwt.js";
import { db } from "../routes/firebase/config.js";

const SALTROUND = 5;
const EXISTUSER = 1;
const EXISTEMAIL = 2;
const EXISTUSERANDEMAIL = 3;
const NOTEXIST = 0;
const EXISTGITHUB = 1;
const EXISTNOTGITHUB = 2;
const getUserList = async () => {
  const userList = [];
  const ref = db.ref(`users`);
  await ref.once(
    "value",
    (users) => {
      users.forEach((user) => {
        userList.push(user.val().info);
      });
    },
    (errorObject) => console.log(errorObject)
  );
  return userList;
};

//email, username => 몇개 일치하는지 확인  0 1 2 3
//email => 해당 유저 정보 확인

//존재O
//깃헙X => 에러 처리
//깃헙O => 로그인
//존재X => 회원가입
//**** */
const signup = (userInfo) => {
  const { username } = userInfo;
  if (!username) throw new Error("Cannot make user.");
  const ref = db.ref(`users/${username}/info`);
  ref.set(userInfo);
};
export const signupNotSocial = async (req, res) => {
  const getErrorText = (isExist) => {
    let errText = ``;
    if (isExist === EXISTUSER) errText = `username`;
    else if (isExist === EXISTUSERANDEMAIL) errText = `username and email`;
    else if (isExist === EXISTEMAIL) errText = `email`;
    return errText;
  };

  const checkExistUser = async ({ email, username }) => {
    const userList = await getUserList();
    return (
      EXISTUSER * userList.includes(username) +
      EXISTEMAIL * userList.includes(email)
    );
  };
  const { email, password, username } = req.body;

  //**** */
  const existCode = await checkExistUser({ email, username });
  if (existCode) {
    return res
      .status(401)
      .send(`User has entered ${getErrorText(existCode)} already exists.`);
  }
  const uid = randomToken.uid(16);
  const hashedPassword = bcrypt.hashSync(password, SALTROUND);
  const userInfo = {
    email,
    username,
    socialType: "",
    uid,
    password: hashedPassword,
  };
  signup(userInfo);
  const access_token = await jwt.sign({
    username,
  });
  return res.json({ access_token, username });
};

export const loginNotSocial = async (req, res) => {
  const getUserInfoByEmail = async (email) => {
    const userList = await getUserList();
    console.log(userList);
    return userList.find((user) => user.email === email);
  };
  const isCorrectUser = (enteredPassword, userInfo) => {
    if (!userInfo) return false;
    return bcrypt.compareSync(enteredPassword, userInfo.password);
  };

  const { email, password } = req.body;

  const userInfo = await getUserInfoByEmail(email);
  console.log("INFO: ", userInfo);
  if (!isCorrectUser(password, userInfo)) {
    return res.status(401).send(`User not Exists.`);
  }
  const access_token = await jwt.sign({
    username: userInfo.username,
  });

  return res.json({ access_token, username: userInfo.username });
};
export const loginGithub = async (req, res) => {
  //존재O
  //깃헙X
  //
  //존재X
  //**** */
  const isExistingGithubUser = async ({ email, username, uid }) => {
    const { userNameSet, userEmailSet } = await getUserList();
    return (
      EXISTUSER * userNameSet.has(username) +
      EXISTEMAIL * userEmailSet.has(email)
    );
  };
  const { code } = req.body;
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
  const response = await axios.post(baseUrl, tokenConfig, header);
  const token = response?.data?.access_token;

  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  console.log("USER DATA: ", data);
  //**** */
  const checkExistGithubUser = async (username) => {
    const userList = await getUserList();
    const findUser = userList.find((user) => user.username === username);
    if (!findUser) return 0;
    return findUser
      ? findUser.socialType === "github"
        ? EXISTGITHUB
        : EXISTNOTGITHUB
      : NOTEXIST;
  };

  const NOTEXIST = 0;
  const EXISTGITHUB = 1;
  const EXISTNOTGITHUB = 2;
  const existCode = await checkExistGithubUser({
    username: data?.login,
  });
  //이미 존재하는 유저라면, uid가 맞는지 확인.
  if (existCode === NOTEXIST) {
    const userInfo = {
      email: data?.email,
      username: data?.login,
      socialType: "github",
      uid: data?.node_id,
    };
    signup(userInfo);
  }
  if (existCode === EXISTGITHUB || existCode === NOTEXIST) {
    //로그인
    const access_token = await jwt.sign({
      username: data.login,
    });
    console.log("TOEKB: ", access_token);
    console.log(data.login);
    return res.json({ access_token, username: data.login });
  } else {
    //401 error
    return res.status(401).send(`User has entered info already exists.`);
  }
};
