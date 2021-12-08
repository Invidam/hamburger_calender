import express from "express";
import {
  verifyToken,
  checkExistUser,
  getSetting,
  loginGithub,
  loginNotSocial,
  postSetting,
  signupNotSocial,
  getGithubAuthUrl,
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
 *     get:
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: Verify Token.
 *      tags: [Auth]
 *      responses:
 *         "400":
 *            description: Missed Token.
 *         "401":
 *            description: Invaild Token.
 *         "200":
 *           description:  Verifie Tokend
 */
authRouter.get("/jwt/verify", protectorMiddleWare, verifyToken);

/**
 *  @swagger
 *  paths:
 *   /auth/github-auth-url:
 *     get:
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: Get Github Auth Url.
 *      tags: [Auth]
 *      responses:
 *         "401":
 *            description: Client id is empty.
 *         "200":
 *            description:  Get Github Auth Url.
 *            schema:
 *                type: object
 *                required: true
 *                properties:
 *                  code:
 *                    type: string
 *                    description: Github Oauth Login Code.
 */
authRouter.get("/github-auth-url", protectorMiddleWare, getGithubAuthUrl);
// /**
//  *  @swagger
//  *  paths:
//  *   /auth/test:
//  *     get:
//  *       summary: Verify JWT Token
//  *       tags: [Auth]
//  *       responses:
//  *         "200":
//  *           description: Username & issued at.
//  *           content:
//  *             application/json:
//  */

/**
 *  @swagger
 *  paths:
 *   /auth/signup:
 *     post:
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          description: x-access-token
 *      summary: Signup not social
 *      tags: [Auth]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserRequest'
 *      responses:
 *         "400":
 *            description: User already logged in.
 *         "401":
 *            description: User has entered Info already exists.
 *         "200":
 *            description:  Complete create user.
 */
authRouter.post(
  "/signup",
  publicOnlyMiddleware,
  checkExistUser,
  signupNotSocial
);
/**
 *  @swagger
 *  paths:
 *   /auth/login/notSocial:
 *     post:
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          description: x-access-token
 *      summary: Signup not social
 *      tags: [Auth]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInfo'
 *      responses:
 *         "400":
 *            description: User already logged in.
 *         "401":
 *            description: Entered User's info was wrong.
 *         "200":
 *            description:  Complete login.
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 */
authRouter.post("/login/notSocial", publicOnlyMiddleware, loginNotSocial);
/**
 *  @swagger
 *  paths:
 *   /auth/login/github:
 *     post:
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          description: x-access-token
 *      summary: Signup not social
 *      tags: [Auth]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *                type: object
 *                required: true
 *                properties:
 *                  code:
 *                    type: string
 *                    description: Github Oauth Login Code.
 *      responses:
 *         "400":
 *            description: User already logged in.
 *         "401":
 *            description: Entered User's info was wrong.
 *         "200":
 *            description:  Complete login.
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 */
authRouter.post("/login/github", publicOnlyMiddleware, loginGithub);

/**
 *  @swagger
 *  paths:
 *   /auth/setting/{user}:
 *     post:
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: Post Work by User & Date
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *                     $ref: '#/components/schemas/UserSetting'
 *      tags: [Auth]
 *      responses:
 *         "400":
 *            description: Failed at post setting.
 *         "200":
 *           description: Success at post setting
 *     get:
 *      parameters:
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *      summary: Get User's target setting
 *      tags: [Auth]
 *      responses:
 *         "400":
 *            description: "User Token is not correct."
 *         "401":
 *            description: "Can't find user's setting."
 *         "200":
 *            description: Get User Setting.
 *            content:
 *              application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/UserSetting'
 *
 */
authRouter
  .route("/setting/:user")
  .all(protectorMiddleWare)
  .post(postSetting)
  .get(getSetting);
// .get(getSetting)
