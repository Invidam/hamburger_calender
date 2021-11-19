import proxy from "http-proxy-middleware";

export const proxyTest = (app) => {
  // app.use(
  //   createProxyMiddleware("/api/data", {
  //     target: "http://localhost:5000",
  //   })
  // );
  app.use(
    proxy("/api", { target: "http://localhost:3002/", changeOrigin: true })
  );
  app.use(
    proxy("/auth", { target: "http://localhost:3002/", changeOrigin: true })
  );
};
