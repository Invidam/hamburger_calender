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
/**
 *  @swagger
 *  tags:
 *    name: Auth
 *    description: API to manage about auth.
 */
export const authRouter = express.Router();

/**
 *  @swagger
 *  paths:
 *   /auth/jwt/verify:
 *     post:
 *       summary: Verify JWT Token
 *       tags: [Auth]
 *       responses:
 *         "200":
 *           description: Username & issued at.
 *           content:
 *             application/json:
 */
authRouter.post("/jwt/verify", protectorMiddleWare, verifyToken);
authRouter.get("/test", (req, res) => res.send("TEST COMPLETE"));
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
