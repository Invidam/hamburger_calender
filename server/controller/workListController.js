import { db } from "../routes/firebase/config.js";

const user = "TEST";
export const postTime = (req, res) => {
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
};

export const getTime = (req, res) => {
  const ref = db.ref(`users/${req.body.user}/workList/${req.body.key}`);

  console.log("REQBODY: ", req.body);
  ref.on(
    "value",
    (timeObj) => {
      console.log("[get-time]OBJ", req.body.key, timeObj.val());
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
  console.log("UNEXPECT");
  // return res.end();
};

export const postWorkList = (req, res) => {
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
};

export const getWorkList = (req, res) => {
  const ref = db.ref(`users/${user}/workList/workList`);
  ref.on(
    "value",
    (workListObj) => {
      console.log("[get-worklist], OBJ: ", workListObj.val());
      const workList = workListObj.val();
      if (!workList) return res.end();
      else return res.json(workList);
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
      return res.send(errorObject);
    }
  );
  console.log("UNEXPECT WORKLIST PAGE");
};
