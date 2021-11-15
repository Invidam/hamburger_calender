import { db } from "../routes/firebase/config.js";
export const putTodo = (req, res) => {
  const { user } = req.params;
  const { isCheck, text, date, priority, id } = req.body;
  const todoItem = { isCheck, text, date, priority, id };
  if (!todoItem.isCheck) todoItem.isCheck = false;
  console.log("PUT TODO: ", todoItem);
  if (!db) return res.status(400).send("can't find database.");
  else {
    db.ref(`users/${user}/todoList/${id}`).set(todoItem);
    return res.status(200).send("push todo success");
  }
};

export const editTodo = (req, res) => {
  const { user } = req.params;
  const { isCheck, text, date, priority, id } = req.body;
  const todoItem = { isCheck, text, date, priority, id };
  if (!todoItem.isCheck) todoItem.isCheck = false;
  if (!db) return res.status(400).send("can't find database.");
  else {
    db.ref(`users/${user}/todoList/${id}`).set(todoItem);
    return res.status(200).send("edit todo success");
  }
};

export const deleteTodo = (req, res) => {
  const { user } = req.params;
  const { id } = req.body;
  if (!db) return res.status(400).send("cannot find db");
  else {
    const ref = db.ref(`users/${user}/todoList`);
    console.log("DELETE", user, id);
    ref.child(id).remove();
    return res.status(200).send("delete todo success");
  }
};
export const editTodoList = (req, res) => {
  const { user } = req.params;
  const { value } = req.body;
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/todoList`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getTodoList = async (req, res) => {
  const { user } = req.params;
  const { type, direction } = req.query;
  const sortType = { type, direction };
  console.log("[TYPE]: ", type, direction);
  // const {}
  const ref = db.ref(`users/${user}/todoList`);
  let response;
  await ref.once(
    "value",
    (todoListObj) => {
      const todoList = todoListObj.val();
      if (todoList) response = todoList;
    },
    (errorObject) => res.send(errorObject)
  );
  if (!response) return res.json({});
  // console.log("RES: ", response);
  const dateCompare = (cand1, cand2, flag) =>
    cand1.date !== cand2.date
      ? cand1.date < cand2.date
        ? -1 * flag
        : 1 * flag
      : cand2.priority - cand1.priority;
  const priorityCompare = (cand1, cand2, flag) =>
    cand1.priority !== cand2.priority
      ? (cand1.priority - cand2.priority) * flag
      : cand1.date < cand2.date
      ? -1
      : 1;
  if (!sortType?.type && !sortType?.direction)
    return res.status(400).json({
      status: "error",
      error: "cannot find sort type object",
    });
  const sortCompare = (cand1, cand2, sortType) => {
    //throw new Error("[Error] Sort type is not valid");
    const type = sortType?.type;
    const directionFlag = sortType.direction === "up" ? -1 : 1;
    if (type === "date") return dateCompare(cand1[1], cand2[1], directionFlag);
    else return priorityCompare(cand1[1], cand2[1], directionFlag);
  };
  let idx = 0;
  const ret = Object.entries(response)
    .sort((a, b) => sortCompare(a, b, sortType))
    .reduce((prev, [key, value]) => ({ ...prev, [idx++]: value }), {});
  console.log("RET2: ", ret);
  return res.json(ret);
};

// const elem1 = { date: "11-03", priority: 1 };
// const elem2 = { date: "12-05", priority: 1 };
// const elem3 = { date: "11-11", priority: 2 };
// const elem4 = { date: "12-16", priority: 5 };
// const elem5 = { date: "12-25", priority: 3 };
// const elem6 = { date: "12-25", priority: 877 };
// const list = { elem1, elem2, elem3, elem4, elem5, elem6 };
// let sortedList = [];
// const dateCompare = (cand1, cand2, flag) =>
//   cand1.date !== cand2.date
//     ? cand1.date < cand2.date
//       ? -1 * flag
//       : 1 * flag
//     : cand2.priority - cand1.priority;
// const priorityCompare = (cand1, cand2, flag) =>
//   cand1.priority !== cand2.priority
//     ? (cand1.priority - cand2.priority) * flag
//     : cand1.date < cand2.date
//     ? -1
//     : 1;

// const makeSortTypeStr = (idx) => {
//   let ret = {};
//   ret["type"] = Math.floor(idx / 2) === 0 ? "date" : "priority";
//   ret["direction"] = idx % 2 === 0 ? "up" : "down";
//   return ret;
// };
// const sortTypes = new Array(4).fill().map((elem, idx) => makeSortTypeStr(idx));

// const sortCompare = (cand1, cand2, sortType) => {
//   if (!sortType?.type && !sortType?.direction)
//     console.log("ERRRRRRRRRRRRRRRRRRRR");
//   //throw new Error("[Error] Sort type is not valid");
//   const type = sortType?.type;
//   const directionFlag = sortType.direction === "up" ? -1 : 1;
//   if (type === "date") return dateCompare(cand1[1], cand2[1], directionFlag);
//   else return priorityCompare(cand1[1], cand2[1], directionFlag);
// };
// sortedList = Object.entries(list)
//   .sort((a, b) => sortCompare(a, b, sortTypes[0]))
//   .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

// console.log("RET: ", sortedList);
