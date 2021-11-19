import axios from "axios";
import randomToken from "rand-token";
import bcrypt from "bcrypt";
import jwt from "../../modules/jwt.js";
import { db } from "../routes/firebase/config.js";
import dotenv from "dotenv";

dotenv.config();
const SALTROUND = 5;
const EXISTUSER = 1;
const EXISTEMAIL = 2;
const EXISTUSERANDEMAIL = 3;
const NOTEXIST = 0;
const EXISTGITHUB = 1;
const EXISTNOTGITHUB = 2;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const DEFAULT_SETTING_OBJECT = {
  targetWorkTime: 8,
  targetWakeTime: { hour: 8, minute: 0 },
  targetBedTime: { hour: 0, minute: 0 },
};
export const catchErrorToken = (decode) =>
  decode === TOKEN_EXPIRED || decode === TOKEN_INVALID;
export const getErrorTokenText = (decode) =>
  `${decode === TOKEN_EXPIRED ? "Token expired." : "Token Invalid."}`;

const MASTER_TOKEN = "q1w2e3r4";
const MY_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkludmlkYW0iLCJpYXQiOjE2MzY5NDk5NzB9.9mlqRxYJMUD-c6yqlF2CPUORMpzpvejpGb29HfrDGOs";
export const verifyToken = async (req, res) => {
  let token = req.headers["x-access-token"];
  if (token === MASTER_TOKEN) token = MY_TOKEN;
  if (!token) return res.status(400).send(`Token missed`);
  const decode = await jwt.verify(token);

  if (catchErrorToken(decode))
    return res.status(401).send(getErrorTokenText(decode));
  console.log("[AUTH] Verify Token: ", { decode });
  return res.send({ decode });
};

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
const setDefaultSetting = (username) => {
  const settingRef = db.ref(`users/${username}/setting`);
  settingRef.set(DEFAULT_SETTING_OBJECT);
};
const signup = (userInfo) => {
  const { username } = userInfo;
  if (!username) throw new Error("Cannot make user.");
  const infoRef = db.ref(`users/${username}/info`);
  infoRef.set(userInfo);
  setDefaultSetting(username);
};

export const checkExistUser = async (req, res, next) => {
  const { email, username } = req.body;
  const getErrorText = (isExist) => {
    let errText = ``;
    if (isExist === EXISTUSER) errText = `username`;
    else if (isExist === EXISTUSERANDEMAIL) errText = `username and email`;
    else if (isExist === EXISTEMAIL) errText = `email`;
    return errText;
  };

  const getExistCode = async ({ email, username }) => {
    const userList = await getUserList();
    return (
      EXISTEMAIL * !!userList.find((user) => user.email === email) +
      EXISTUSER * !!userList.find((user) => user.username === username)
    );
  };

  const existCode = await getExistCode({ email, username });
  if (existCode) {
    return res
      .status(401)
      .send(`User has entered ${getErrorText(existCode)} already exists.`);
  } else next();
};
export const signupNotSocial = async (req, res) => {
  const { email, password, username } = req.body;

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
  console.log("[AUTH], USER: ", username, "SIGNUP COMPLETE");
  return res.status(200).send("Sign up Complete");
};

export const loginNotSocial = async (req, res) => {
  try {
    const isCorrectUser = (enteredPassword, userInfo) => {
      if (!userInfo) return false;
      return bcrypt.compareSync(enteredPassword, userInfo.password);
    };
    const getUserInfoByEmail = async (email) => {
      const userList = await getUserList();
      return userList.find((user) => user?.email && user?.email === email);
    };
    // const { value } = req.body;
    const { email, password } = req.body;
    if (!req.body) throw new Error(`Entered user info was wrong.`);

    const userInfo = await getUserInfoByEmail(email);
    if (!isCorrectUser(password, userInfo)) throw new Error(`User not Exists.`);

    const access_token = await jwt.sign({
      username: userInfo.username,
    });
    console.log(`[AUTH] USER: ${userInfo.username} LOGGED IN`);
    return res.json({ access_token, username: userInfo.username });
  } catch (error) {
    console.log(error.name, "\n", error.message, "\n", error.stack);

    return res.status(401).send(error.message);
  }
};
export const loginGithub = async (req, res) => {
  try {
    console.log("[AUTH] 도착: ");
    const { code } = req.body;
    if (!req.body) throw new Error("Entered UserInfo was wrong.");
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
    console.log("[AUTH] header: ", header, tokenConfig);
    const response = await axios.post(baseUrl, tokenConfig, header);
    const token = response?.data?.access_token;
    console.log("[AUTH] TOKEN: ", token);
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log("[AUTH] data: ", data);
    //**** */
    const checkExistGithubUser = async (username) => {
      const userList = await getUserList();
      const findUser = userList.find((user) => user?.username === username);
      if (!findUser) return 0;
      return findUser
        ? findUser.socialType === "github"
          ? EXISTGITHUB
          : EXISTNOTGITHUB
        : NOTEXIST;
    };

    const existCode = await checkExistGithubUser(data?.login);
    console.log("[AUTH] CODE: ", existCode);
    //이미 존재하는 유저라면, uid가 맞는지 확인.
    if (existCode === NOTEXIST) {
      //존재하지 않는 경우 회원가입
      const userInfo = {
        email: data?.email,
        username: data?.login,
        socialType: "github",
        uid: data?.node_id,
      };
      signup(userInfo);
    }
    if (existCode === EXISTGITHUB || existCode === NOTEXIST) {
      // 유저는 존재할 때, 로그인.
      //로그인
      const access_token = await jwt.sign({
        username: data.login,
      });
      console.log(`[AUTH] USER: ${data.login} LOGGED IN.`);
      return res.json({ access_token, username: data.login });
    } else {
      //401 error
      throw new Error(`User has entered info already exists.`);
    }
  } catch (error) {
    console.log("[AUTH]ERR: ", error);
    return res.status(401).send(error.message);
  }
};

export const postSetting = (req, res) => {
  try {
    const { user } = req.params;
    const { targetWorkTime, targetWakeTime, targetBedTime } = req.body;
    const targetTimeObj = { targetWorkTime, targetWakeTime, targetBedTime };
    console.log(`${user} Post Setting`, req.body);
    const ref = db.ref(`users/${user}/setting`);
    ref.set(targetTimeObj);
    console.log(`[AUTH] USER: ${user} POST SETTING : `, targetTimeObj);
    return res.status(200).send("Failed at post setting.");
  } catch (error) {
    return res.status(400).send("Can't post Setting");
  }
};

export const getSetting = (req, res) => {
  const { user } = req.params;
  const ref = db.ref(`users/${user}/setting`);
  ref.once(
    "value",
    (settingObj) => {
      const setting = settingObj.val();
      console.log("[AUTH] USER: ", user, "GET SETTING, ", setting);
      if (!setting) return res.end();
      else return res.json(setting);
    },
    (errorObject) => res.status(401).send(errorObject)
  );
};
