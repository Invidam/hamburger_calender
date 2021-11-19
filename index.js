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
import { swaggerUi, specs } from "./modules/swagger.js";
const __dirname = path.resolve();
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// app.use(routes.swagger, swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// app.use("/api", apiRouter);
app.use("/api/:user/worklist/:date", workListRouter);
app.use("/api/:user/todolist", todoListRouter);
// app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/api/:user/listview", listViewRouter);
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "build/index.html"));
});
app.listen(port, () => console.log(`Listening Start on port ${port}`));
