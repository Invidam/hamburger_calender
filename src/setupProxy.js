import { createProxyMiddleware } from "http-proxy-middleware";

export const proxyTest = (app) => {
  // app.use(
  //   createProxyMiddleware("/api/data", {
  //     target: "http://localhost:5000",
  //   })
  // );
  app.use(
    createProxyMiddleware(["/api", "/auth"], {
      target: "http://localhost:3002/",
      changeOrigin: true,
    })
  );
};
