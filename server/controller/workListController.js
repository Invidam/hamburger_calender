import { db } from "../routes/firebase/config.js";

const divideDate = (date) => {
  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const dividedAddress = `${year}/${month}/${day}`;
  return { year, month, day, dividedAddress };
};
export const postTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`).set(value);
    return res.status(200).json({ status: "time edit success" });
  }
};
export const putTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`).set(value);
    return res.status(200).json({ status: "time put success" });
  }
};
export const editTime = (req, res) => {
  // res.end
  const { key, user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`).set(value);
    return res.status(200).json({ status: "time edit success" });
  }
};

export const getTime = (req, res) => {
  const { key, user, date } = req.params;
  const { dividedAddress } = divideDate(date);
  const ref = db.ref(`users/${user}/date/${dividedAddress}/workList/${key}`);

  ref.once(
    "value",
    (timeObj) => {
      const time = timeObj.val();
      return res.json(time);
    },
    (errorObject) => res.send(errorObject)
  );
};
export const deleteTime = (req, res) => {
  const { key, user, date } = req.params;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    const ref = db.ref(`users/${user}/date/${dividedAddress}/workList`);
    ref.child(key).remove();
    return res.status(200).json({ status: "delete time success" });
  }
};
export const pushWork = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(
      `users/${user}/date/${dividedAddress}/workList/workList/${value.id}`
    ).set(value);
    return res.status(200).json({ status: "push work success" });
  }
};

export const editWork = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(
      `users/${user}/date/${dividedAddress}/workList/workList/${value.id}`
    ).set(value);
    return res.status(200).json({ status: "edit work success" });
  }
};

export const deleteWork = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;

  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    const ref = db.ref(
      `users/${user}/date/${dividedAddress}/workList/workList/`
    );
    ref.child(value.id).remove();
    return res.status(200).json({ status: "delete work success" });
  }
};
export const updateWorkList = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;
  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/workList/workList`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getWorkList = (req, res) => {
  const { user, date } = req.params;
  // const {}
  const { dividedAddress } = divideDate(date);
  const ref = db.ref(`users/${user}/date/${dividedAddress}/workList/workList`);
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
