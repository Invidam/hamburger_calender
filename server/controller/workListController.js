import { db } from "../routes/firebase/config.js";

const user = "TEST";
export const postTime = (req, res) => {
  // res.end
  const { key, value } = req.body;
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${req.body.user}/workList/${key}`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getTime = (req, res) => {
  const ref = db.ref(`users/${req.body.user}/workList/${req.body.key}`);

  ref.on(
    "value",
    (timeObj) => {
      const time = timeObj.val();
      return res.json(time);
    },
    (errorObject) => res.send(errorObject)
  );
};

export const postWorkList = (req, res) => {
  const { value } = req.body;

  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${req.body.user}/workList/workList`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getWorkList = (req, res) => {
  const ref = db.ref(`users/${user}/workList/workList`);
  ref.on(
    "value",
    (workListObj) => {
      const workList = workListObj.val();
      if (!workList) return res.end();
      else return res.json(workList);
    },
    (errorObject) => res.send(errorObject)
  );
};
