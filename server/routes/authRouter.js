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
/**
 *  @swagger
 *  paths:
 *   /auth/test:
 *     get:
 *       summary: Verify JWT Token
 *       tags: [Auth]
 *       responses:
 *         "200":
 *           description: Username & issued at.
 *           content:
 *             application/json:
 */
authRouter.get("/test", (req, res) => res.send("TEST COMPLETE"));
authRouter.post(
  "/signup",
  publicOnlyMiddleware,
  checkExistUser,
  signupNotSocial
);
authRouter.post("/login/notSocial", publicOnlyMiddleware, loginNotSocial);
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
 *          description: User name
 *      summary: Post Work by User & Date
 *      requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                name:          # <!--- form field name
 *                  type: string
 *                fav_number:    # <!--- form field name
 *                  type: integer
 *              required:
 *                - name
 *                - email
 *      tags: [Auth]
 *      responses:
 *         "200":
 *           description: Username & issued at.
 *           content:
 *             application/json:
 *           schema:
 *            type: string
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
 *                     $ref: '#/components/schemas/Work'
 *
 */
authRouter
  .route("/setting/:user")
  .all(protectorMiddleWare)
  .post(postSetting)
  .get(getSetting);
// .get(getSetting)
