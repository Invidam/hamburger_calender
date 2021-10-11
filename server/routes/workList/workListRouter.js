import express from "express";
import {
  deleteTime,
  deleteWork,
  editTime,
  editWork,
  getDateInfo,
  getTime,
  getWorkList,
  putWork,
  putTime,
  editWorkList,
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
  .route("/work")
  .all(protectorMiddleWare)
  .post(editWork)
  .put(putWork)
  .delete(deleteWork);

workListRouter
  .route("/worklist")
  .all(protectorMiddleWare)
  .get(getWorkList)
  .post(editWorkList);

workListRouter
  .route("/worklist/date-info")
  .all(protectorMiddleWare)
  .get(getDateInfo);
