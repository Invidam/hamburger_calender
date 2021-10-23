import express from "express";
import {
  deleteTodo,
  editTodo,
  getTodoList,
  putTodo,
  editTodoList,
} from "../controller/todoListController.js";
import { protectorMiddleWare } from "../middlewares.js";

export const todoListRouter = express.Router({ mergeParams: true });
todoListRouter
  .route("/Todo")
  .all(protectorMiddleWare)
  .post(editTodo)
  .put(putTodo)
  .delete(deleteTodo);

todoListRouter
  .route("")
  .all(protectorMiddleWare)
  .get(getTodoList)
  .post(editTodoList);
