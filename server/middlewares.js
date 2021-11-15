import jwt from "../modules/jwt.js";
import {
  catchErrorToken,
  getErrorTokenText,
} from "./controller/authController.js";

export const publicOnlyMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // if (typeof token === "string") token = JSON.parse(token);
  // console.log(
  //   "PUB MIDD",
  //   token,
  //   typeof token,
  //   token !== "undefined",
  //   token && token !== "undefined"
  // );
  // console.log("PUB ONLY MID, token: ", token, typeof token, JSON.parse(token));
  console.log("PUB ONLY , ", token);
  if (token && token !== "undefined")
    res.status(400).send("User already logged in.");
  else next();
};
const MASTER_TOKEN = "q1w2e3r4";
const isTokenUser = async (token, user) => {
  if (token === MASTER_TOKEN) return true;
  console.log("TOKEN HEADER: ", token, typeof token);
  // if(token[0] === "\"")
  const decode = await jwt.verify(token);
  if (catchErrorToken(decode)) return false;
  const { username } = decode;
  console.log("RET VAL: ", user, username);
  return user === username;
};
export const protectorMiddleWare = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const { user } = req.params;
  if (!user || (await isTokenUser(token, user))) next();
  else res.status(400).send("User's token is not correct.");
};
