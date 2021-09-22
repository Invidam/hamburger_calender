import axios from "axios";
import express from "express";
import qs from "qs";
import {
  loginGithub,
  loginNotSocial,
  signup,
} from "../controller/userController.js";
export const authRouter = express.Router();

authRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
authRouter.get("/finish", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
authRouter.post("/signup", signup);
authRouter.post("/login/notSocial", loginNotSocial);
authRouter.post("/login/github", loginGithub);
