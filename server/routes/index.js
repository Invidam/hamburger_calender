import express from "express";
import { db } from "./firebase/config.js";
// const database = require("./firebase/config");

export const router = express.Router();
let cnt = 0;
const user = "TEST";
router.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
router.post("/record-time", (req, res) => {
  console.log("[record-time]RECEIVE: ", req.body);
  // res.end
  const { key, value } = req.body;
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${req.body.user}/workList/${key}`).set(value);
    console.log("SET END");
    return res.status(200).json({ status: "success" });
  }
  // return res.send("GOOD");
  // return res.end();
});

router.post("/get-time", (req, res) => {
  const ref = db.ref(`users/${req.body.user}/workList/${req.body.key}`);

  console.log("REQBODY: ", req.body, ++cnt);
  ref.on(
    "value",
    (timeObj) => {
      console.log("[get-time]OBJ", req.body.key, timeObj.val(), cnt);
      const time = timeObj.val();
      console.log("TIME AT", time);
      return res.json(time);
      // return res.end();
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
      console.log("ERROR AT");
      return res.send(errorObject);
    }
  );
  console.log("UNEXPECT", cnt);
  // return res.end();
});

router.post("/update-worklist", (req, res) => {
  console.log("[update-worklist] RECEIVE: ", req.body);
  const { value } = req.body;
  console.log("VALUE: ", typeof value, value);

  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${req.body.user}/workList/workList`).set(value);
    console.log("SET END");
    return res.status(200).json({ status: "success" });
  }
  // return res.send("GOOD");
  // return res.end();
});

router.get("/get-worklist", (req, res) => {
  const ref = db.ref(`users/${user}/workList/workList`);
  ref.on(
    "value",
    (workListObj) => {
      console.log("[get-worklist], OBJ: ", workListObj.val());
      const workList = workListObj.val();
      return res.json(workList);
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
      return res.send(errorObject);
    }
  );
});
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
