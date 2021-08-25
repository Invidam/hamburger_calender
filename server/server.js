import express from "express";
// import api from "./routes/index";
import { router as api } from "./routes/index.js";
import cors from "cors";
const port = 3002;
const app = express();
app.use(cors());
app.use("/api", api);

app.listen(port, () => console.log(`Listening Start on port ${port}`));
