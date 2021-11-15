import express from "express";
import { getListView } from "../controller/listViewController.js";

import { protectorMiddleWare } from "../middlewares.js";
/**
 *  @swagger
 *  tags:
 *    name: ListView
 *    description: API to manage about list view.
 */
export const listViewRouter = express.Router({ mergeParams: true });
listViewRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
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
listViewRouter.route("/").all(protectorMiddleWare).get(getListView);

// listViewRouter
//   .route("/worklist")
//   .all(protectorMiddleWare)
//   .get(getWorkList)
//   .post(editWorkList);

// listViewRouter
//   .route("/worklist/date-info")
//   .all(protectorMiddleWare)
//   .get(getDateInfo);
