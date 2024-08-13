import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { userRoutes } from "./routes/users.routes";
import { postRoutes } from "./routes/posts.routes";

const app: FastifyInstance = fastify({ logger: true });

const swaggerOptions = {
  swagger: {
    info: {
      title: "Tech Challenge II API",
      description: "Tech Challenge II API Documentation",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/documentation",
  swaggerOptions: {
    url: "/documentation/json",
  },
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(userRoutes, { prefix: "/users" });
app.register(postRoutes, { prefix: "/posts" });

app.listen(
  {
    port: 3000,
  },
  () => {
    console.log("Server is running on http://localhost:3000");
  }
);
