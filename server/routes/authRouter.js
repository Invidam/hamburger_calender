import express from "express";
import {
  verifyToken,
  checkExistUser,
  getSetting,
  loginGithub,
  loginNotSocial,
  postSetting,
  signupNotSocial,
} from "../controller/authController.js";
import { protectorMiddleWare, publicOnlyMiddleware } from "../middlewares.js";
export const authRouter = express.Router();

authRouter.post("/jwt/verify", protectorMiddleWare, verifyToken);

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
