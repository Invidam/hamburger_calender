import { divideDate } from "../tools/time.js";
import { db } from "../routes/firebase/config.js";
export const putTodo = (req, res) => {
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
      `users/${user}/date/${dividedAddress}/todoList/todoList/${value.id}`
    ).set(value);
    return res.status(200).json({ status: "push todo success" });
  }
};

export const editTodo = (req, res) => {
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
      `users/${user}/date/${dividedAddress}/todoList/todoList/${value.id}`
    ).set(value);
    return res.status(200).json({ status: "edit todo success" });
  }
};

export const deleteTodo = (req, res) => {
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
      `users/${user}/date/${dividedAddress}/todoList/todoList/`
    );
    ref.child(value.id).remove();
    return res.status(200).json({ status: "delete todo success" });
  }
};
export const editTodoList = (req, res) => {
  const { user, date } = req.params;
  const { value } = req.body;
  const { dividedAddress } = divideDate(date);
  if (!db)
    return res.status(400).json({
      status: "error",
      error: "cannot find db",
    });
  else {
    db.ref(`users/${user}/date/${dividedAddress}/todoList/todoList`).set(value);
    return res.status(200).json({ status: "success" });
  }
};

export const getTodoList = (req, res) => {
  const { user, date } = req.params;
  // const {}
  const { dividedAddress } = divideDate(date);
  const ref = db.ref(`users/${user}/date/${dividedAddress}/todoList/todoList`);
  ref.once(
    "value",
    (todoListObj) => {
      const todoList = todoListObj.val();
      if (!todoList) return res.end();
      else return res.json(todoList);
    },
    (errorObject) => res.send(errorObject)
  );
};
