import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "dotenv/config";
// import { workListRouter } from "./routes/workList/workListRouter.js";
import { authRouter } from "./routes/authRouter.js";
// import { apiRouter } from "./routes/apiRouter.js";
import { workListRouter } from "./routes/workListRouter.js";
import { listViewRouter } from "./routes/listViewRouter.js";
import { todoListRouter } from "./routes/todoListRouter.js";
import swaggerUi from "swagger-ui-express";
import { specs } from "./modules/swagger.js";
// const swaggerUi = require("swagger-ui-express");
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.resolve();
const port = process.env.PORT || 3002;
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/:user/worklist/:date", workListRouter);
app.use("/api/:user/todolist", todoListRouter);
app.use("/auth", authRouter);
app.use("/api/:user/listview", listViewRouter);
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => console.log(`Listening Start on port ${port}`));
