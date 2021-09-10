import express from "express";
// import api from "./routes/index";
import morgan from "morgan";
import { router as api } from "./routes/index.js";
import cors from "cors";
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
app.use("/api", api);

app.listen(port, () => console.log(`Listening Start on port ${port}`));
