import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
// import { workListRouter } from "./routes/workList/workListRouter.js";
import { authRouter } from "./routes/authRouter.js";
// import { apiRouter } from "./routes/apiRouter.js";
import { workListRouter } from "./routes/workListRouter.js";
import { listViewRouter } from "./routes/listViewRouter.js";
import { todoListRouter } from "./routes/todoListRouter.js";
const port = 3002;
const app = express();
const logger = morgan("dev");
app.use(cors());
app.use(logger);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// app.use("/api", apiRouter);
app.use("/api/:user/:date/worklist", workListRouter);
app.use("/api/:user/:date/todolist", todoListRouter);
// app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/api/:user/listview", listViewRouter);
app.listen(port, () => console.log(`Listening Start on port ${port}`));
