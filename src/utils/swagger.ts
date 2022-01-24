import express from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import swaggerJSDoc from "swagger-jsdoc";

/**
 * Swagger를 사용하도록 한다.
 * @param app Express Application
 */
export function useSwagger(app: express.Application) {
  // Parse class-validator classes into JSON Schema:
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "test Api",
        version: "1.0.0",
        description: "docs",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    schemes: ["http", "https"],
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    apis: ["*/swagger/**/*Sw.yaml"],
  };
  const specs = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
