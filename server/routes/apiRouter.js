import express from "express";
import { workListRouter } from "./workList/workListRouter.js";

export const apiRouter = express.Router({ mergeParams: true });
apiRouter.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
// apiRouter.route("/:user/:date/worklist", workListRouter);
//app.use("/api/:user/:date/worklist", workListRouter);
