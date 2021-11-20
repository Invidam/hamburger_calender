import jsonwebtoken from "jsonwebtoken";
import randomToken from "rand-token";
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
const jwtKeyOption = {
  algorithm: "HS256", // 해싱 알고리즘
  expiresIn: "30m", // 토큰 유효 기간
  issuer: "issuer", // 발행자
};
const jwt = {
  sign: async ({ username }) => {
    const secretKey = process.env.JWT_KEY;
    const payload = {
      username,
    };
    const result = {
      token: jsonwebtoken.sign(payload, secretKey, jwtKeyOption),
      refreshToken: randomToken.uid(16),
    };
    return result;
  },
  verify: async (token) => {
    let decode;
    try {
      const secretKey = process.env.JWT_KEY;
      console.log("[AUTH] sec key: ", secretKey);
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
