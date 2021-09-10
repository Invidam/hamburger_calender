import express from "express";
export const router = express.Router();

router.get("/hello", (req, res) => {
  res.send({ greeting: "Hello React X Node j1s" });
});
router.post("/world", (req, res) => {
  console.log("RECEIVE: ", req.body);
  // res.end
  res.send(`Rece2ived Data: ${req.body}`);
});
