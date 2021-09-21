import jsonwebtoken from "jsonwebtoken";
import randomToken from "rand-token";
import key from "../key/JWTKey.js";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const jwt = {
  sign: async ({ name }) => {
    const { secretKey, options } = key;
    const payload = {
      name,
    };
    console.log("SECRET,", secretKey, options);
    const result = {
      token: jsonwebtoken.sign(payload, secretKey, options),
      refreshToken: randomToken.uid(16),
    };
    return result;
  },
  veryfy: async (token) => {
    let decode;
    try {
      const { secretKey, options } = key;
      decode = jsonwebtoken.verify(token, secretKey);
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (error.message === "invalid token") {
        console.log("invalid token");
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
    return decode;
  },
};

export default jwt;
