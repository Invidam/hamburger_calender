import axios from "axios";
import express from "express";
import qs from "qs";
import jwt from "jsonwebtoken";
export const authRouter = express.Router();
authRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
authRouter.get("/finish", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});

authRouter.post("/login/notSocial", async (req, res) => {
  //   const { code } = req.body;
  const { email, password } = req.body;
  console.log("REQ DATA: ", email, password);
  //   const baseUrl = "https://github.com/login/oauth/authorize";
  //   const tokenConfig = {
  //     client_id: process.env.GH_CLIENT_ID,
  //     allow_signup: false,
  //     scope: "read:user user:email",
  //   };
  //   const authUrl = baseUrl + qs.stringify(tokenConfig);
  //   const finalUrl = await axios.get(authUrl);
  //   console.log("RES", finalUrl);

  return res.end();
});
authRouter.post("/github-login", async (req, res) => {
  const { code } = req.body;
  console.log("CONNET ON NODE-github page: ", code);
  //   const { email, password } = req.body;
  const baseUrl = "https://github.com/login/oauth/access_token";
  const tokenConfig = {
    code,
    _client_id: process.env.GH_CLIENT_ID,
    get client_id() {
      return this._client_id;
    },
    set client_id(value) {
      this._client_id = value;
    },
    client_secret: process.env.GH_CLIENT_SECRETS,
  };
  const header = {
    headers: {
      accept: "application/json",
    },
  };
  console.log(tokenConfig);
  const response = await axios.post(baseUrl, tokenConfig, header);
  const token = response?.data?.access_token;

  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  console.log("USER DATA: ", data);
  //   const access_token = await jwt.generate({
  //     login: data.login,
  //     id: data.id,
  //     avatar_url: data.avatar_url,
  //   });

  return res.json(JSON.stringify(data));
  //   return res.redirect(finalUrl);
  //React로 옮기기!!
});
