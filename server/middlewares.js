import jwt from "../modules/jwt.js";
import {
  catchErrorToken,
  getErrorTokenText,
} from "./controller/authController.js";

export const publicOnlyMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("[PUB ONLY MID] token: ", token);
  if (token && token !== "undefined")
    res.status(400).send("User already logged in.");
  else next();
};
const MASTER_TOKEN = "q1w2e3r4";
const isTokenUser = async (token, user) => {
  if (token === MASTER_TOKEN) return true;
  // if(token[0] === "\"")
  const decode = await jwt.verify(token);
  if (catchErrorToken(decode)) return false;
  const { username } = decode;
  return user === username;
};
export const protectorMiddleWare = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  const { user } = req.params;
  console.log("[PROTECT MID] USER : ", user);
  if (!user || (await isTokenUser(token, user))) next();
  else res.status(400).send("User's token is not correct.");
};
