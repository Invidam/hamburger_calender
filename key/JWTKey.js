const key = {
  secretKey: "mm8ys32ecr9et02k1e3y", // 원하는 시크릿 ㅍ키
  option: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "30m", // 토큰 유효 기간
    issuer: "issuer", // 발행자
  },
};
export default key;
