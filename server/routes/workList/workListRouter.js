import express from "express";
import {
  getTime,
  getWorkList,
  postTime,
  postWorkList,
} from "../../controller/workListController.js";

export const workListRouter = express.Router({ mergeParams: true });
workListRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});

workListRouter
  .get("/record-time/:key", getTime)
  .post("/record-time/:key", postTime);

workListRouter.post("/worklist", postWorkList).get("/worklist", getWorkList);
