import express from "express";
import {
  editWork,
  getTime,
  getWorkList,
  postTime,
  pushWork,
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
  .put(pushWork)
  .post(editWork)
  .get(getWorkList);
