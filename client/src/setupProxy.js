// import { createProxyMiddleware } from "http-proxy-middleware";
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(createProxyMiddleware("/auth", { target: "http://localhost:3002/" }));
  app.use(createProxyMiddleware("/api", { target: "http://localhost:3002/" }));
};
