import proxy from "http-proxy-middleware";

export const proxyTest = (app) => {
  app.use(proxy("/api", { target: "http://localhost:3002/" }));
};
