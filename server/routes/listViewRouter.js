import express from "express";
import { getListView } from "../controller/listViewController.js";

import { protectorMiddleWare } from "../middlewares.js";

export const listViewRouter = express.Router({ mergeParams: true });
listViewRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});

listViewRouter.route("/listview").all(protectorMiddleWare).get(getListView);

// listViewRouter
//   .route("/worklist")
//   .all(protectorMiddleWare)
//   .get(getWorkList)
//   .post(editWorkList);

// listViewRouter
//   .route("/worklist/date-info")
//   .all(protectorMiddleWare)
//   .get(getDateInfo);
