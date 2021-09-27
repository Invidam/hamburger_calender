export const publicOnlyMiddleware = (req, res, next) => {
  const token = JSON.parse(req.headers["x-access-token"]);
  console.log(
    "PUB MIDD",
    token,
    typeof token,
    token !== "undefined",
    token && token !== "undefined"
  );
  if (token && token !== "undefined")
    res.status(401).send("User already logged in.");
  else next();
};

export const protectorMiddleWare = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("PRO MIDD", token, token == "undefined");
  if (token && token !== "undefined") next();
  else res.status(401).send("User not logged in.");
};
