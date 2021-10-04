export const publicOnlyMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // if (typeof token === "string") token = JSON.parse(token);
  // console.log(
  //   "PUB MIDD",
  //   token,
  //   typeof token,
  //   token !== "undefined",
  //   token && token !== "undefined"
  // );
  // console.log("PUB ONLY MID, token: ", token, typeof token, JSON.parse(token));
  if (token && token !== "undefined" && JSON.parse(token))
    res.status(401).send("User already logged in.");
  else next();
};

export const protectorMiddleWare = (req, res, next) => {
  const token = req.headers["x-access-token"];
  const date = req.headers["x-access-date"];
  // console.log(date, typeof date);
  // console.log("PRO MIDD", token, token === "undefined");
  if (token && token !== "undefined") next();
  else res.status(401).send("User not logged in.");
};
