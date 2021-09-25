import express from "express";
import { workListRouter } from "./workList/workListRouter.js";

import jwt from "../../modules/jwt.js";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

export const apiRouter = express.Router({ mergeParams: true });
apiRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
apiRouter.post("/jwt/verify", async (req, res) => {
  const { token } = req.body;
  console.log("BODY: ", req.body, token);
  const decode = await jwt.verify(token);
  console.log("DEOCDE: ", decode);
  if (decode === TOKEN_EXPIRED || decode === TOKEN_INVALID)
    return res.send("EXPRIEDD");
  return res.send({ decode });
});
// apiRouter.route("/:user/:date/worklist", workListRouter);
//app.use("/api/:user/:date/worklist", workListRouter);
