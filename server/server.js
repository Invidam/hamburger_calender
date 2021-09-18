import express from "express";
// import api from "./routes/index";
import morgan from "morgan";
// import { router as api } from "./routes/apiRouter.js";

import cors from "cors";
import { workListRouter } from "./routes/workList/workListRouter.js";
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
app.use("/api/:user/:date/worklist", workListRouter);

app.listen(port, () => console.log(`Listening Start on port ${port}`));
