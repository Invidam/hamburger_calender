import express from "express";
import {
  getTime,
  getWorkList,
  postTime,
  postWorkList,
} from "../controller/workListController.js";
// const database = require("./firebase/config");

export const router = express.Router();
router.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
router.post("/record-time", postTime);

router.post("/get-time", getTime);

router.post("/worklist", postWorkList).get("/worklist", getWorkList);
/*
timeObj를 만들어 리턴하자.
obj에 wake, bedTime 둘다 들어있게
*/
// router.get("/save", function (req, res) {
//   database.ref("customer").set({ name: "junseok" }, function (error) {
//     if (error) console.error(error);
//     else console.log("success save !!");
//   });
//   return res.json({ firebase: true });
// });

// database
