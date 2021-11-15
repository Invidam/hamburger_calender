import express from "express";
import {
  deleteTodo,
  editTodo,
  getTodoList,
  putTodo,
  editTodoList,
} from "../controller/todoListController.js";
import { protectorMiddleWare } from "../middlewares.js";
/**
 *  @swagger
 *  tags:
 *    name: TodoList
 *    description: API to manage about Todo List.
 */

export const todoListRouter = express.Router({ mergeParams: true });
/**
 *  @swagger
 *  paths:
 *   /api/{user}/todolist/todo:
 *     put:
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: put todo item in  list.
 *      tags: [TodoList]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  put todo item in list.
 *     post:
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: edit todo item in  list.
 *      tags: [TodoList]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  edit todo item in list.
 *     delete:
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: delete todo item in  list.
 *      tags: [TodoList]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: to delete item's id.
 *
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  delete todo item in list.
 */
todoListRouter
  .route("/Todo")
  .all(protectorMiddleWare)
  .post(editTodo)
  .put(putTodo)
  .delete(deleteTodo);
/**
 *  @swagger
 *  paths:
 *   /api/{user}/listview:
 *     get:
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: query
 *          name: startDate
 *          schema:
 *            type: string
 *          required: true
 *          description: from start date, get data.
 *        - in: query
 *          name: endDate
 *          schema:
 *            type: string
 *          required: true
 *          description: To end date, get data.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: Get list view in range from start date to end date.
 *      tags: [ListView]
 *      responses:
 *         "404":
 *            description:Cant find database.
 *         "200":
 *           description:  Get WorkLists in date range.
 *           content:
 *             application/json:
 *                schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/WorkListArray'
 */
todoListRouter
  .route("")
  .all(protectorMiddleWare)
  .get(getTodoList)
  .post(editTodoList);
