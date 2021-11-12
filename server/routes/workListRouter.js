import express from "express";
import {
  deleteTime,
  deleteWork,
  editTime,
  editWork,
  getDateInfo,
  getTime,
  getWorkList,
  putWork,
  putTime,
  editWorkList,
  getGrade,
} from "../controller/workListController.js";
import { protectorMiddleWare } from "../middlewares.js";
/**
 *  @swagger
 *  tags:
 *    name: WorkList
 *    description: API to manage WorkList & Record Time.
 */
export const workListRouter = express.Router({ mergeParams: true });
workListRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});

workListRouter
  .route("/record-time/:key")
  .all(protectorMiddleWare)
  .get(getTime)
  .put(putTime)
  .post(editTime)
  .delete(deleteTime);
/**
 *  @swagger
 *  paths:
 *   /api/{user}/worklsit/{date}/work:
 *     post:
 *      summary: Post Work by User & Date
 *      requestBody:
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                name:          # <!--- form field name
 *                  type: string
 *                fav_number:    # <!--- form field name
 *                  type: integer
 *              required:
 *                - name
 *                - email
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: User name
 *        - in: path
 *          name: date
 *          schema:
 *            type: string
 *          required: true
 *          description: To Manage Date
 *      tags: [WorkList]
 *      responses:
 *         "200":
 *           description: Username & issued at.
 *           content:
 *             application/json:
 *           schema:
 *            type: string
 */
workListRouter
  .route("/work")
  .all(protectorMiddleWare)
  .post(editWork)
  .put(putWork)
  .delete(deleteWork);

workListRouter
  .route("")
  .all(protectorMiddleWare)
  .get(getWorkList)
  .post(editWorkList);

workListRouter.route("/date-info").all(protectorMiddleWare).get(getDateInfo);

workListRouter.route("/grade").all(protectorMiddleWare).get(getGrade);
