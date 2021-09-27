import axios from "axios";
import express from "express";
import qs from "qs";
import {
  checkExistUser,
  getSetting,
  loginGithub,
  loginNotSocial,
  postSetting,
  signupNotSocial,
} from "../controller/userController.js";
import { protectorMiddleWare, publicOnlyMiddleware } from "../middlewares.js";
export const authRouter = express.Router();

authRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
authRouter.get("/finish", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
authRouter.post(
  "/signup",
  publicOnlyMiddleware,
  checkExistUser,
  signupNotSocial
);
authRouter.post("/login/notSocial", publicOnlyMiddleware, loginNotSocial);
authRouter.post("/login/github", publicOnlyMiddleware, loginGithub);

authRouter
  .route("/setting/:user")
  .all(protectorMiddleWare)
  .post(postSetting)
  .get(getSetting);
// .get(getSetting)
