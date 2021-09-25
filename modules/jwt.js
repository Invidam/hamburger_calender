import jsonwebtoken from "jsonwebtoken";
import randomToken from "rand-token";
import key from "../key/JWTKey.js";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const jwt = {
  sign: async ({ username }) => {
    const { secretKey, options } = key;
    const payload = {
      username,
    };
    const result = {
      token: jsonwebtoken.sign(payload, secretKey, options),
      refreshToken: randomToken.uid(16),
    };
    return result;
  },
  verify: async (token) => {
    let decode;
    try {
      const { secretKey, options } = key;
      console.log("TOKEN: ", token);
      decode = jsonwebtoken.verify(token, secretKey);
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (error.message === "invalid token") {
        console.log("1invalid token");
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("2invalid token");
        return TOKEN_INVALID;
      }
    }
    return decode;
  },
};

export default jwt;
