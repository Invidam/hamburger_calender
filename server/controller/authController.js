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
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
export const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log("BODY: ", req.body, token);
  if (!token) return res.status(401).send(`Token missed`);
  const decode = await jwt.verify(token);
  // console.log("DEOCDE: ", decode);
  if (decode === TOKEN_EXPIRED || decode === TOKEN_INVALID)
    return res
      .status(401)
      .send(
        `${decode === TOKEN_EXPIRED ? "Token expired." : "Token Invalid."}`
      );
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
const signup = (userInfo) => {
  const { username } = userInfo;
  if (!username) throw new Error("Cannot make user.");
  const ref = db.ref(`users/${username}/info`);
  ref.set(userInfo);
};

export const checkExistUser = async (req, res, next) => {
  const { email, username } = req.body?.value;
  const getErrorText = (isExist) => {
    let errText = ``;
    if (isExist === EXISTUSER) errText = `username`;
    else if (isExist === EXISTUSERANDEMAIL) errText = `username and email`;
    else if (isExist === EXISTEMAIL) errText = `email`;
    return errText;
  };

  const getExistCode = async ({ email, username }) => {
    const userList = await getUserList();
    console.log(
      "CHECK EXIST USER, ",
      "EM",
      userList.find((user) => user.email === email),
      "NA",
      userList.find((user) => user.username === username)
    );
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
  const { value } = req.body;
  const { email, password, username } = value;

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
  const isCorrectUser = (enteredPassword, userInfo) => {
    if (!userInfo) return false;
    return bcrypt.compareSync(enteredPassword, userInfo.password);
  };
  const getUserInfoByEmail = async (email) => {
    const userList = await getUserList();
    return userList.find((user) => user?.email && user?.email === email);
  };
  try {
    // const { value } = req.body;
    const { email, password } = req.body?.value;
    if (!req.body?.value) throw new Error(`Entered user info was wrong.`);

    const userInfo = await getUserInfoByEmail(email);
    if (!isCorrectUser(password, userInfo)) throw new Error(`User not Exists.`);

    const access_token = await jwt.sign({
      username: userInfo.username,
    });

    return res.json({ access_token, username: userInfo.username });
  } catch (error) {
    console.log(error.name, "\n", error.message, "\n", error.stack);

    return res.status(401).send(error.message);
  }
};
export const loginGithub = async (req, res) => {
  try {
    const { code } = req.body?.value;
    if (!req.body?.value) throw new Error("Entered UserInfo was wrong.");
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
      return res.json({ access_token, username: data.login });
    } else {
      //401 error
      throw new Error(`User has entered info already exists.`);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error.message);
  }
};

export const postSetting = (req, res) => {
  console.log("REACH");
  const { user } = req.params;
  const { value } = req.body;
  const ref = db.ref(`users/${user}/setting`);
  ref.set(value);
  return res.status(200).json({ status: "edit setting success" });
};

export const getSetting = (req, res) => {
  const { user } = req.params;
  const ref = db.ref(`users/${user}/setting`);
  ref.once(
    "value",
    (settingObj) => {
      const setting = settingObj.val();
      if (!setting) return res.end();
      else return res.json(setting);
    },
    (errorObject) => res.send(errorObject)
  );
};
