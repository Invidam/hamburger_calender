import { db } from "../routes/firebase/config.js";

const user = "TEST";
export const postTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${date}/workList/${key}`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getTime = (req, res) => {
  const { key, user, date } = req.params;
  const ref = db.ref(`users/${user}/date/${date}/workList/${key}`);

  ref.once(
    "value",
    (timeObj) => {
      const time = timeObj.val();
      console.log("At time ADd ERROR OC...");
      return res.json(time);
    },
    (errorObject) => res.send(errorObject)
  );
  console.log("IS ERROR CAUSE??");
};

export const postWorkList = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;

  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${date}/workList/workList`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getWorkList = (req, res) => {
  const { user, date } = req.params;
  console.log("PARAMS: ", req.params);
  // const {}
  console.log("GET WORKLIST:", user, date);
  const ref = db.ref(`users/${user}/date/${date}/workList/workList`);
  ref.once(
    "value",
    (workListObj) => {
      const workList = workListObj.val();
      if (!workList) return res.end();
      else return res.json(workList);
    },
    (errorObject) => res.send(errorObject)
  );
};
