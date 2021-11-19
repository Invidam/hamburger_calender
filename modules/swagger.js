// export const swaggerUi = require("swagger-ui-express");
// const swaggereJsdoc = require("swagger-jsdoc");
import swagerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";
export const swaggerUi = swagerUi;
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hamburger App API",
      version: "1.0.0",
      description: "Hamburger App API with express",
    },
    host: "localhost:3300",
    basePath: "/",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  apis: ["./server/routes/*.js", "./server/swagger/*"],
};

export const specs = swaggereJsdoc(options);
