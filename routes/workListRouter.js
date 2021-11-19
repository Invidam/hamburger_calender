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
 *    description: API to manage WorkList
 */
/**
 *  @swagger
 *  tags:
 *    name: WorkList - Work
 *    description: API to manage Work
 */
/**
 *  @swagger
 *  tags:
 *    name: WorkList - RecordTime
 *    description: API to manage Record Time.
 */
export const workListRouter = express.Router({ mergeParams: true });
workListRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});

/**
 *  @swagger
 *  paths:
 *   /api/{user}/workList/{date}/record-time/{key}:
 *     get:
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
 *          description: time's record date.
 *        - in: path
 *          name: key
 *          schema:
 *            type: string
 *            enum: [wakeTime, bedTime]
 *          required: true
 *          description: To manage time key.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: get time in database.
 *      tags: [WorkList - RecordTime]
 *      responses:
 *         "400":
 *            description: Cant find database.
 *         "200":
 *            description: Success Get time success.
 *            content:
 *              application/json:
 *               schema:
 *                 $ref: '#/components/schemas/RecordTime'
 *     put:
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
 *          description: time's record date.
 *        - in: path
 *          name: key
 *          schema:
 *            type: string
 *            enum: [wakeTime, bedTime]
 *          required: true
 *          description: To manage time key.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: put time to worklist.
 *      tags: [WorkList - RecordTime]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecordTime'
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  Success put recordtime in worklist..
 *     post:
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
 *          description: time's record date.
 *        - in: path
 *          name: key
 *          schema:
 *            type: string
 *            enum: [wakeTime, bedTime]
 *          required: true
 *          description: To manage time key.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: edit time to worklist.
 *      tags: [WorkList - RecordTime]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/RecordTime'
 *      responses:
 *         "400":
 *            description: Cant find database.
 *         "200":
 *           description:  Success edit recordtime in worklist.
 *     delete:
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
 *          description: time's record date.
 *        - in: path
 *          name: key
 *          schema:
 *            type: string
 *            enum: [wakeTime, bedTime]
 *          required: true
 *          description: To manage time key.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: delete time to worklist.
 *      tags: [WorkList - RecordTime]
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  Success put recordtime in worklist.
 */
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
 *   /api/{user}/workList/{date}/work:
 *     put:
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
 *          description: work's saved date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: put work to worklist.
 *      tags: [WorkList - Work]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Work'
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  Success put work in worklist..
 *     post:
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
 *          description: work's saved date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: edit work to worklist.
 *      tags: [WorkList - Work]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/Work'
 *      responses:
 *         "400":
 *            description: Cant find database.
 *         "200":
 *           description:  Success edit work in worklist by id.
 *     delete:
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
 *          description: work's saved date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: delete work to worklist.
 *      tags: [WorkList - Work]
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
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  Success delete work in worklist.
 */
workListRouter
  .route("/work")
  .all(protectorMiddleWare)
  .put(putWork)
  .post(editWork)
  .delete(deleteWork);

/**
 *  @swagger
 *  paths:
 *   /api/{user}/workList/{date}:
 *     get:
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
 *          description: worklist's saved date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: get worklist.
 *      tags: [WorkList]
 *      responses:
 *         "400":
 *            description:Cant find database.
 *         "200":
 *           description:  Success put work in worklist..
 *           content:
 *             application/json:
 *                schema:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/WorkArray'
 *     post:
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
 *          description: time's record date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: edit worklist.
 *      tags: [WorkList]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/WorkArray'
 *      responses:
 *         "400":
 *            description: Cant find database.
 *         "200":
 *           description:  Success edit worklist.
 */
workListRouter
  .route("")
  .all(protectorMiddleWare)
  .get(getWorkList)
  .post(editWorkList);

/**
 *  @swagger
 *  paths:
 *   /api/{user}/workList/{date}/date-info:
 *     get:
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
 *          description: worklist's saved date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: get worklist.
 *      tags: [WorkList]
 *      responses:
 *         "200":
 *           description:  Success Get Entered Date array.
 *           content:
 *             application/json:
 *                schema:
 *                 type: array
 *                 items:
 *                    type: string
 */
workListRouter.route("/date-info").all(protectorMiddleWare).get(getDateInfo);
/**
 *  @swagger
 *  paths:
 *   /api/{user}/workList/{date}/grade:
 *     get:
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
 *          description: worklist's saved date.
 *        - in: header
 *          name: x-access-token
 *          schema:
 *            type: string
 *          required: true
 *          description: x-access-token
 *      summary: get worklist.
 *      tags: [WorkList]
 *      responses:
 *         "400" :
 *            description: Can't find database.
 *         "200":
 *           description:  Success Get grade in worklist.
 *           content:
 *             application/json:
 *               schema:
 *                $ref: '#/components/schemas/gradeInfo'
 */
workListRouter.route("/grade").all(protectorMiddleWare).get(getGrade);
