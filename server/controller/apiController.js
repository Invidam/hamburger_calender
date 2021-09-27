import jwt from "../../modules/jwt.js";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
export const verifyToken = async (req, res) => {
  const { token } = req.body;
  console.log("BODY: ", req.body, token);
  const decode = await jwt.verify(token);
  console.log("DEOCDE: ", decode);
  if (decode === TOKEN_EXPIRED || decode === TOKEN_INVALID)
    return res.send(
      `${decode === TOKEN_EXPIRED ? "Token expired." : "Token Invalid."}`
    );
  return res.send({ decode });
};
