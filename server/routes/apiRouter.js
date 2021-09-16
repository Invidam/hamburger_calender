import express from "express";
import {
  getTime,
  getWorkList,
  postTime,
  postWorkList,
} from "../controller/workListController.js";

export const router = express.Router();
router.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
router.post("/record-time", postTime);

router.post("/get-time", getTime);

router.post("/worklist", postWorkList).get("/worklist", getWorkList);
