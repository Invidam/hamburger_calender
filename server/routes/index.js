import express from "express";
import { database } from "./firebase/config.js";

export const router = express.Router();

router.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
router.post("/world", (req, res) => {
  console.log("RECEIVE: ", req.body);
  // res.end
  res.send({ DATA: req.body });
});
// router.get("/save", function (req, res) {
//   database.ref("customer").set({ name: "junseok" }, function (error) {
//     if (error) console.error(error);
//     else console.log("success save !!");
//   });
//   return res.json({ firebase: true });
// });

// database
