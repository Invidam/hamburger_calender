// import swaggerUi from "swagger-ui-express";
// const swaggereJsdoc = require("swagger-jsdoc");
import swaggereJsdoc from "swagger-jsdoc";
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
  apis: ["./routes/*.js", "./swagger/*"],
};

export const specs = swaggereJsdoc(options);

// export default { specs };
