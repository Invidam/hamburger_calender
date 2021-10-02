import express from "express";
import {
  deleteTime,
  deleteWork,
  editTime,
  editWork,
  getTime,
  getWorkList,
  pushWork,
  putTime,
  updateWorkList,
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
  .put(putTime)
  .post(editTime)
  .delete(deleteTime);

workListRouter
  .route("/worklist")
  .all(protectorMiddleWare)
  .post(editWork)
  .put(pushWork)
  .delete(deleteWork)
  .get(getWorkList);

workListRouter
  .route("/worklist/update")
  .all(protectorMiddleWare)
  .post(updateWorkList);
