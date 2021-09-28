import express from "express";
import {
  getTime,
  getWorkList,
  postTime,
  postWorkList,
} from "../../controller/workListController.js";
import { protectorMiddleWare } from "../../middlewares.js";

export const workListRouter = express.Router({ mergeParams: true });
workListRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});

workListRouter
  .route("/record-time/:key")
  .all(protectorMiddleWare)
  .get(getTime)
  .post(postTime);

workListRouter
  .route("/worklist")
  .all(protectorMiddleWare)
  .post(postWorkList)
  .get(getWorkList);
